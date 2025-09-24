import React from "react";

const Loading = () => (
    <div className="flex items-center justify-center p-6">
        <div className="animate-pulse">
            <div className="h-6 w-40 rounded bg-muted" />
        </div>
    </div>
);

export default Loading;
