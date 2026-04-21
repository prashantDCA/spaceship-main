import AdminAssets from "@/components/admin/assets/AdminAssets"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Asset Library | Admin Dashboard",
    description: "Manage team files and assets",
}

export default function AssetsPage() {
    return (
        <div className="p-6 h-[calc(100vh-80px)] overflow-hidden">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Asset Library</h1>
                <p className="text-gray-400">Manage and share files with your team.</p>
            </div>

            <div className="h-full pb-20">
                <AdminAssets />
            </div>
        </div>
    )
}
