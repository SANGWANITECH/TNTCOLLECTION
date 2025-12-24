import { Settings2, Construction } from "lucide-react";

export default function Settings() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6">
            <div className="max-w-md mx-auto text-center">
                <div className="relative">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                        <Settings2 className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                        <Construction className="w-8 h-8 text-amber-500 animate-pulse" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Settings Under Construction
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    We're building a powerful settings panel to give you complete control
                    over your dashboard. Stay tuned for customizable preferences,
                    user management, and advanced configurations.
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Estimated launch: Coming soon
                    </span>
                </div>
            </div>
        </div>
    );
}