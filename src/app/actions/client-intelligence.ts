'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

import { TwitterApi } from 'twitter-api-v2'

export interface ClientIntelligence {
    id: string
    client_id: string
    source_type: 'news' | 'twitter' | 'instagram' | 'youtube' | 'facebook' | 'linkedin' | 'manual'
    source_name?: string
    source_url?: string
    title: string
    content?: string
    summary?: string
    image_url?: string
    sentiment?: 'positive' | 'negative' | 'neutral' | 'mixed'
    relevance_score: number
    is_verified: boolean
    published_at?: string
    fetched_at: string
    created_by?: string
    metadata?: Record<string, any>
}

export interface CreateIntelligenceData {
    client_id: string
    source_type: ClientIntelligence['source_type']
    source_name?: string
    source_url?: string
    title: string
    content?: string
    summary?: string
    image_url?: string
    sentiment?: ClientIntelligence['sentiment']
    relevance_score?: number
    is_verified?: boolean
    published_at?: string
    metadata?: Record<string, any>
}

async function getSupabaseClient() {
    const cookieStore = await cookies()
    return createClient(cookieStore)
}

// Fetch intelligence for a specific client
export async function getClientIntelligence(clientId: string): Promise<{
    data: ClientIntelligence[] | null
    error: string | null
}> {
    try {
        const supabase = await getSupabaseClient()

        const { data, error } = await supabase
            .from('client_intelligence')
            .select('*')
            .eq('client_id', clientId)
            .order('published_at', { ascending: false, nullsFirst: false })
            .limit(50)

        if (error) {
            console.error('Error fetching client intelligence:', error)
            return { data: null, error: error.message }
        }

        return { data: data || [], error: null }
    } catch (error) {
        console.error('Error in getClientIntelligence:', error)
        return { data: null, error: 'Failed to fetch client intelligence' }
    }
}

// Add intelligence manually
export async function addClientIntelligence(data: CreateIntelligenceData): Promise<{
    data: ClientIntelligence | null
    error: string | null
}> {
    try {
        const supabase = await getSupabaseClient()

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            return { data: null, error: 'Unauthorized' }
        }

        const { data: result, error } = await supabase
            .from('client_intelligence')
            .insert({
                ...data,
                created_by: user.id,
                relevance_score: data.relevance_score ?? 1.0,
                is_verified: data.is_verified ?? true, // Manual entries are verified by default
            })
            .select()
            .single()

        if (error) {
            console.error('Error adding intelligence:', error)
            return { data: null, error: error.message }
        }

        return { data: result, error: null }
    } catch (error) {
        console.error('Error in addClientIntelligence:', error)
        return { data: null, error: 'Failed to add intelligence' }
    }
}

// Delete intelligence entry
export async function deleteClientIntelligence(id: string): Promise<{
    success: boolean
    error: string | null
}> {
    try {
        const supabase = await getSupabaseClient()

        const { error } = await supabase
            .from('client_intelligence')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting intelligence:', error)
            return { success: false, error: error.message }
        }

        return { success: true, error: null }
    } catch (error) {
        console.error('Error in deleteClientIntelligence:', error)
        return { success: false, error: 'Failed to delete intelligence' }
    }
}

// Update verification status
export async function verifyIntelligence(id: string, isVerified: boolean): Promise<{
    success: boolean
    error: string | null
}> {
    try {
        const supabase = await getSupabaseClient()

        const { error } = await supabase
            .from('client_intelligence')
            .update({ is_verified: isVerified })
            .eq('id', id)

        if (error) {
            console.error('Error updating verification:', error)
            return { success: false, error: error.message }
        }

        return { success: true, error: null }
    } catch (error) {
        console.error('Error in verifyIntelligence:', error)
        return { success: false, error: 'Failed to update verification' }
    }
}

// Get intelligence summary for AI chatbot context
export async function getIntelligenceSummaryForAI(clientId: string): Promise<string> {
    try {
        const supabase = await getSupabaseClient()

        const { data, error } = await supabase
            .from('client_intelligence')
            .select('title, content, summary, source_type, sentiment, published_at')
            .eq('client_id', clientId)
            .eq('is_verified', true)
            .order('published_at', { ascending: false })
            .limit(20)

        if (error || !data || data.length === 0) {
            return ''
        }

        // Format intelligence for AI context
        const summaries = data.map((item, index) => {
            const date = item.published_at ? new Date(item.published_at).toLocaleDateString() : 'Unknown date'
            const sentiment = item.sentiment ? ` (${item.sentiment})` : ''
            return `${index + 1}. [${item.source_type.toUpperCase()}] ${item.title}${sentiment}
   Date: ${date}
   ${item.summary || item.content?.substring(0, 200) || 'No content'}`
        }).join('\n\n')

        return `
=== RECENT NEWS & INTELLIGENCE ABOUT THIS CLIENT ===
${summaries}
=== END OF INTELLIGENCE ===
`
    } catch (error) {
        console.error('Error getting intelligence summary:', error)
        return ''
    }
}

// Fetch news from NewsAPI and save to database
export async function fetchNewsForClient(
    clientId: string,
    clientName: string,
    additionalKeywords?: string[]
): Promise<{
    data: ClientIntelligence[] | null
    error: string | null
    message?: string
}> {
    try {
        const supabase = await getSupabaseClient()

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            return { data: null, error: 'Unauthorized' }
        }

        // Check if API key is configured
        const apiKey = process.env.NEWSAPI_KEY
        if (!apiKey) {
            return {
                data: null,
                error: 'NewsAPI key not configured. Add NEWSAPI_KEY to your .env.local file.',
                message: 'Get a free API key from https://newsapi.org/register'
            }
        }

        // Build search query - use client name + additional context
        const searchTerms = [clientName]
        if (additionalKeywords && additionalKeywords.length > 0) {
            searchTerms.push(...additionalKeywords)
        }
        const query = encodeURIComponent(searchTerms.join(' OR '))

        // Fetch from NewsAPI (Everything endpoint for broader search)
        // Free tier: limited to articles from last month
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        const fromDate = oneMonthAgo.toISOString().split('T')[0]

        const newsUrl = `https://newsapi.org/v2/everything?q=${query}&from=${fromDate}&sortBy=publishedAt&pageSize=10&language=en&apiKey=${apiKey}`

        const response = await fetch(newsUrl, {
            headers: { 'User-Agent': 'SpaceshipCRM/1.0' }
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error('NewsAPI error:', errorData)
            return {
                data: null,
                error: `NewsAPI error: ${errorData.message || response.statusText}`
            }
        }

        const newsData = await response.json()

        if (!newsData.articles || newsData.articles.length === 0) {
            return {
                data: [],
                error: null,
                message: `No news found for "${clientName}" in the last month.`
            }
        }

        // Process and save articles
        const savedArticles: ClientIntelligence[] = []
        const errors: string[] = []

        for (const article of newsData.articles) {
            // Skip articles without proper content
            if (!article.title || article.title === '[Removed]') continue

            try {
                // Use upsert to avoid duplicates
                const { data: saved, error: saveError } = await supabase
                    .from('client_intelligence')
                    .upsert({
                        client_id: clientId,
                        source_type: 'news',
                        source_name: article.source?.name || 'Unknown Source',
                        source_url: article.url,
                        title: article.title,
                        content: article.description || article.content?.substring(0, 500),
                        image_url: article.urlToImage,
                        published_at: article.publishedAt,
                        is_verified: false, // Needs human verification
                        relevance_score: 0.7, // Default score, AI can refine later
                        created_by: user.id,
                        metadata: {
                            author: article.author,
                            fetched_via: 'newsapi'
                        }
                    }, {
                        onConflict: 'client_id,source_url'
                    })
                    .select()
                    .single()

                if (saved) {
                    savedArticles.push(saved)
                }
                if (saveError && !saveError.message.includes('duplicate')) {
                    errors.push(saveError.message)
                }
            } catch (err) {
                console.error('Error saving article:', err)
            }
        }

        return {
            data: savedArticles,
            error: null,
            message: `Fetched ${savedArticles.length} articles for "${clientName}". Review and verify them.`
        }
    } catch (error) {
        console.error('Error in fetchNewsForClient:', error)
        return { data: null, error: 'Failed to fetch news. Please try again.' }
    }
}

// Helper to extract YouTube channel ID or handle from URL/input
function extractYouTubeChannelIdentifier(input: string): { type: 'id' | 'handle' | 'username', value: string } | null {
    if (!input) return null

    const trimmed = input.trim()

    // Direct channel ID (starts with UC)
    if (trimmed.startsWith('UC') && trimmed.length === 24) {
        return { type: 'id', value: trimmed }
    }

    // Handle format (@username)
    if (trimmed.startsWith('@')) {
        return { type: 'handle', value: trimmed }
    }

    // URL patterns
    const channelIdMatch = trimmed.match(/youtube\.com\/channel\/(UC[a-zA-Z0-9_-]{22})/)
    if (channelIdMatch) {
        return { type: 'id', value: channelIdMatch[1] }
    }

    const handleMatch = trimmed.match(/youtube\.com\/@([a-zA-Z0-9_-]+)/)
    if (handleMatch) {
        return { type: 'handle', value: '@' + handleMatch[1] }
    }

    const userMatch = trimmed.match(/youtube\.com\/user\/([a-zA-Z0-9_-]+)/)
    if (userMatch) {
        return { type: 'username', value: userMatch[1] }
    }

    // Assume it's a handle if just a name
    return { type: 'handle', value: trimmed.startsWith('@') ? trimmed : '@' + trimmed }
}

// Fetch YouTube channel data and recent videos
export async function fetchYouTubeDataForClient(
    clientId: string,
    youtubeHandle: string
): Promise<{
    data: ClientIntelligence[] | null
    error: string | null
    message?: string
}> {
    try {
        const supabase = await getSupabaseClient()

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            return { data: null, error: 'Unauthorized' }
        }

        // Check if API key is configured
        const apiKey = process.env.YOUTUBE_API_KEY
        if (!apiKey) {
            return {
                data: null,
                error: 'YouTube API key not configured. Add YOUTUBE_API_KEY to your .env.local file.',
                message: 'Get a free API key from Google Cloud Console → APIs & Services → YouTube Data API v3'
            }
        }

        // Extract channel identifier
        const identifier = extractYouTubeChannelIdentifier(youtubeHandle)
        if (!identifier) {
            return { data: null, error: 'Invalid YouTube channel URL or handle' }
        }

        // First, we need to get the channel ID
        let channelId: string | null = null
        let channelTitle: string = ''
        let channelDescription: string = ''
        let subscriberCount: string = ''

        if (identifier.type === 'id') {
            channelId = identifier.value
        } else {
            // Search for channel by handle or username
            const searchParam = identifier.type === 'handle'
                ? `forHandle=${encodeURIComponent(identifier.value)}`
                : `forUsername=${encodeURIComponent(identifier.value)}`

            const channelUrl = `https://www.googleapis.com/youtube/v3/channels?${searchParam}&part=snippet,statistics&key=${apiKey}`

            const channelResponse = await fetch(channelUrl)
            if (!channelResponse.ok) {
                const errorData = await channelResponse.json().catch(() => ({}))
                console.error('YouTube channel lookup error:', errorData)
                return { data: null, error: `YouTube API error: ${errorData.error?.message || channelResponse.statusText}` }
            }

            const channelData = await channelResponse.json()
            if (!channelData.items || channelData.items.length === 0) {
                return { data: null, error: `No YouTube channel found for "${youtubeHandle}"` }
            }

            channelId = channelData.items[0].id
            channelTitle = channelData.items[0].snippet?.title || ''
            channelDescription = channelData.items[0].snippet?.description || ''
            subscriberCount = channelData.items[0].statistics?.subscriberCount || ''
        }

        // If we only had the ID, fetch channel details
        if (!channelTitle && channelId) {
            const detailsUrl = `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet,statistics&key=${apiKey}`
            const detailsResponse = await fetch(detailsUrl)
            if (detailsResponse.ok) {
                const detailsData = await detailsResponse.json()
                if (detailsData.items?.[0]) {
                    channelTitle = detailsData.items[0].snippet?.title || ''
                    channelDescription = detailsData.items[0].snippet?.description || ''
                    subscriberCount = detailsData.items[0].statistics?.subscriberCount || ''
                }
            }
        }

        // Fetch recent videos
        const videosUrl = `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet&order=date&type=video&maxResults=10&key=${apiKey}`

        const videosResponse = await fetch(videosUrl)
        if (!videosResponse.ok) {
            const errorData = await videosResponse.json().catch(() => ({}))
            console.error('YouTube videos error:', errorData)
            return { data: null, error: `YouTube API error: ${errorData.error?.message || videosResponse.statusText}` }
        }

        const videosData = await videosResponse.json()
        const savedItems: ClientIntelligence[] = []

        // Save channel info as an intelligence entry
        if (channelTitle) {
            const formatSubs = (count: string) => {
                const num = parseInt(count)
                if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
                if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
                return count
            }

            try {
                const { data: channelEntry } = await supabase
                    .from('client_intelligence')
                    .upsert({
                        client_id: clientId,
                        source_type: 'youtube',
                        source_name: 'YouTube Channel',
                        source_url: `https://www.youtube.com/channel/${channelId}`,
                        title: `📺 ${channelTitle} - YouTube Channel (${formatSubs(subscriberCount)} subscribers)`,
                        content: channelDescription?.substring(0, 500) || 'No channel description',
                        is_verified: false,
                        relevance_score: 0.9,
                        created_by: user.id,
                        published_at: new Date().toISOString(),
                        metadata: { channel_id: channelId, subscribers: subscriberCount }
                    }, { onConflict: 'client_id,source_url' })
                    .select()
                    .single()

                if (channelEntry) savedItems.push(channelEntry)
            } catch (err) {
                console.error('Error saving channel info:', err)
            }
        }

        // Save recent videos
        for (const video of (videosData.items || [])) {
            const videoId = video.id?.videoId
            if (!videoId) continue

            try {
                const { data: videoEntry } = await supabase
                    .from('client_intelligence')
                    .upsert({
                        client_id: clientId,
                        source_type: 'youtube',
                        source_name: channelTitle || 'YouTube',
                        source_url: `https://www.youtube.com/watch?v=${videoId}`,
                        title: video.snippet?.title || 'Untitled video',
                        content: video.snippet?.description?.substring(0, 500),
                        image_url: video.snippet?.thumbnails?.medium?.url,
                        published_at: video.snippet?.publishedAt,
                        is_verified: false,
                        relevance_score: 0.8,
                        created_by: user.id,
                        metadata: { video_id: videoId, fetched_via: 'youtube_api' }
                    }, { onConflict: 'client_id,source_url' })
                    .select()
                    .single()

                if (videoEntry) savedItems.push(videoEntry)
            } catch (err) {
                console.error('Error saving video:', err)
            }
        }

        return {
            data: savedItems,
            error: null,
            message: `Fetched ${savedItems.length} YouTube items for channel "${channelTitle || youtubeHandle}". Review and verify them.`
        }
    } catch (error) {
        console.error('Error in fetchYouTubeDataForClient:', error)
        return { data: null, error: 'Failed to fetch YouTube data. Please try again.' }
    }
}

// Helper to extract Twitter handle
function extractTwitterHandle(input: string): string | null {
    if (!input) return null
    const trimmed = input.trim()

    // Already just a handle (with or without @)
    if (!trimmed.includes('/') && !trimmed.includes('.')) {
        return trimmed.startsWith('@') ? trimmed.substring(1) : trimmed
    }

    // URL patterns
    const matches = trimmed.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/)
    if (matches && matches[1]) {
        return matches[1]
    }

    return null
}

// Fetch Twitter/X data
export async function fetchTwitterDataForClient(
    clientId: string,
    twitterHandle: string
): Promise<{
    data: ClientIntelligence[] | null
    error: string | null
    message?: string
}> {
    try {
        const supabase = await getSupabaseClient()

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            return { data: null, error: 'Unauthorized' }
        }

        // Check if API key is configured
        const bearerToken = process.env.TWITTER_BEARER_TOKEN
        if (!bearerToken) {
            return {
                data: null,
                error: 'Twitter API token not configured.',
                message: 'Add TWITTER_BEARER_TOKEN to your .env file.'
            }
        }

        const username = extractTwitterHandle(twitterHandle)
        if (!username) {
            return { data: null, error: 'Invalid Twitter handle or URL' }
        }

        // Initialize client
        const twitterClient = new TwitterApi(bearerToken)
        const readOnlyClient = twitterClient.readOnly

        const savedItems: ClientIntelligence[] = []
        let twitterUser: any = null

        // 1. Fetch User Details
        try {
            const userResult = await readOnlyClient.v2.userByUsername(username, {
                'user.fields': ['description', 'public_metrics', 'profile_image_url', 'url']
            })

            if (!userResult.data) {
                return { data: null, error: `Twitter user "@${username}" not found` }
            }
            twitterUser = userResult.data
        } catch (error: any) {
            console.error('Error fetching Twitter user:', error)
            if (error?.data) console.error('Twitter API User Error Data:', JSON.stringify(error.data, null, 2))

            // If user fetch fails, we can't proceed
            if (error.code === 400 || error.code === 403) {
                return { data: null, error: `Twitter API Error: ${error.data?.detail || error.message}` }
            }
            throw error
        }

        // Save User Profile
        const formatCount = (count: number) => {
            if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
            if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
            return count.toString()
        }

        try {
            const { data: profileEntry } = await supabase
                .from('client_intelligence')
                .upsert({
                    client_id: clientId,
                    source_type: 'twitter',
                    source_name: 'X (Twitter) Profile',
                    source_url: `https://x.com/${username}`,
                    title: `👤 ${twitterUser.name} (@${username}) - ${formatCount(twitterUser.public_metrics?.followers_count || 0)} Followers`,
                    content: twitterUser.description || 'No bio available',
                    image_url: twitterUser.profile_image_url,
                    is_verified: true,  // Auto-verify Twitter posts
                    relevance_score: 0.9,
                    created_by: user.id,
                    published_at: new Date().toISOString(),
                    metadata: {
                        twitter_id: twitterUser.id,
                        metrics: twitterUser.public_metrics
                    }
                }, { onConflict: 'client_id,source_url' })
                .select()
                .single()

            if (profileEntry) savedItems.push(profileEntry)
        } catch (err) {
            console.error('Error saving Twitter profile:', err)
        }

        // 2. Fetch Recent Tweets
        try {
            // Simplified request: Removed 'exclude' which causes 400 on some tiers
            const tweetsResult = await readOnlyClient.v2.userTimeline(twitterUser.id, {
                max_results: 5,
                'tweet.fields': ['created_at', 'text', 'public_metrics']
                // removed exclude: ['retweets', 'replies'] to avoid 400 Invalid Request
            })

            if (tweetsResult.tweets) {
                for (const tweet of tweetsResult.tweets) {
                    try {
                        const { data: tweetEntry } = await supabase
                            .from('client_intelligence')
                            .upsert({
                                client_id: clientId,
                                source_type: 'twitter',
                                source_name: twitterUser.name,
                                source_url: `https://x.com/${username}/status/${tweet.id}`,
                                title: `🐦 Tweet: ${tweet.text.substring(0, 50)}...`,
                                content: tweet.text,
                                published_at: tweet.created_at,
                                is_verified: true,  // Auto-verify Twitter posts
                                relevance_score: 0.8,
                                created_by: user.id,
                                metadata: {
                                    tweet_id: tweet.id,
                                    metrics: tweet.public_metrics
                                }
                            }, { onConflict: 'client_id,source_url' })
                            .select()
                            .single()

                        if (tweetEntry) savedItems.push(tweetEntry)
                    } catch (err) {
                        console.error('Error saving tweet:', err)
                    }
                }
            }
        } catch (error: any) {
            // If timeline fetch fails (e.g. 403 Forbidden on Free tier), we still return the profile
            console.error('Error fetching tweets:', error)
            if (error?.data) console.error('Twitter API Timeline Error Data:', JSON.stringify(error.data, null, 2))

            // Don't fail the whole request if just timeline fails
            if (savedItems.length > 0) {
                return {
                    data: savedItems,
                    error: null,
                    message: `Fetched profile only. Tweets could not be fetched (likely API tier limit).`
                }
            }
        }

        return {
            data: savedItems,
            error: null,
            message: `Fetched profile + ${savedItems.length - 1} tweets for @${username}.`
        }

    } catch (error: any) {
        console.error('Error in fetchTwitterDataForClient:', error)
        if (error?.data) console.error('Twitter API General Error Data:', JSON.stringify(error.data, null, 2))

        if (error.code === 429) {
            return { data: null, error: 'Twitter API rate limit exceeded. Please try again later.' }
        }
        return { data: null, error: `Twitter API Error: ${error.message || 'Unknown error'}` }
    }
}
