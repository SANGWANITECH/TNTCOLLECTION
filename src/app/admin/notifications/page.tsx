import { Bell, BellOff, Sparkles } from "lucide-react";

export default function NotificationsPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6">
            <div className="max-w-md mx-auto text-center">
                <div className="relative">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center">
                        <Bell className="w-12 h-12 text-blue-400 dark:text-blue-300" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Notifications Center
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    We're crafting a smart notifications hub to keep you updated on orders,
                    alerts, and important activities. Get ready for real-time updates,
                    customizable alerts, and seamless notification management.
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-600 dark:text-blue-300">
                        Launching soon with exciting features
                    </span>
                </div>
            </div>
        </div>
    );
}