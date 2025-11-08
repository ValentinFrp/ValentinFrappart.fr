import React from "react";

interface LoadingProps {
  type?: "hero" | "card" | "expertise" | "experience" | "project";
  count?: number;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  type = "card",
  count = 1,
  className = "",
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case "hero":
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-96 h-16 bg-gray-800 rounded-lg animate-pulse mx-auto"></div>
              <div className="w-64 h-6 bg-gray-800 rounded-lg animate-pulse mx-auto"></div>
              <div className="flex gap-4 justify-center mt-12">
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className="w-16 h-8 bg-gray-800 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        );

      case "expertise":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: count }, (_, i) => (
              <div
                key={i}
                className="p-8 rounded-lg bg-gray-900/30 animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-700 rounded-lg mb-6"></div>
                <div className="w-3/4 h-6 bg-gray-700 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="w-full h-3 bg-gray-700 rounded"></div>
                  <div className="w-5/6 h-3 bg-gray-700 rounded"></div>
                  <div className="w-4/6 h-3 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        );

      case "project":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: count }, (_, i) => (
              <div
                key={i}
                className="bg-gray-900/50 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-700"></div>
                <div className="p-6">
                  <div className="w-3/4 h-5 bg-gray-700 rounded mb-2"></div>
                  <div className="space-y-2 mb-4">
                    <div className="w-full h-3 bg-gray-700 rounded"></div>
                    <div className="w-5/6 h-3 bg-gray-700 rounded"></div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {Array.from({ length: 3 }, (_, j) => (
                      <div
                        key={j}
                        className="w-16 h-6 bg-gray-700 rounded-full"
                      ></div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <div className="w-24 h-8 bg-gray-700 rounded"></div>
                    <div className="w-20 h-8 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4 max-w-4xl mx-auto">
            {Array.from({ length: count }, (_, i) => (
              <div
                key={i}
                className="bg-gray-900/50 rounded-lg p-6 animate-pulse"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="w-1/2 h-5 bg-gray-700 rounded"></div>
                  <div className="w-24 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-3 bg-gray-700 rounded"></div>
                  <div className="w-5/6 h-3 bg-gray-700 rounded"></div>
                  <div className="w-4/6 h-3 bg-gray-700 rounded"></div>
                </div>
                <div className="flex gap-2 mt-4">
                  {Array.from({ length: 4 }, (_, j) => (
                    <div
                      key={j}
                      className="w-16 h-6 bg-gray-700 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="w-full h-32 bg-gray-700 rounded-lg"></div>
          </div>
        );
    }
  };

  return (
    <div className={`loading-container ${className}`}>{renderSkeleton()}</div>
  );
};

export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  width?: string;
}> = ({ lines = 3, className = "", width = "w-full" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }, (_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-700 rounded animate-pulse ${
          i === lines - 1 ? "w-3/4" : width
        }`}
      ></div>
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`bg-gray-900/50 rounded-lg p-6 animate-pulse ${className}`}>
    <div className="w-12 h-12 bg-gray-700 rounded-lg mb-4"></div>
    <div className="w-3/4 h-6 bg-gray-700 rounded mb-2"></div>
    <div className="w-1/2 h-4 bg-gray-700 rounded mb-4"></div>
    <SkeletonText lines={3} />
  </div>
);

export const SkeletonImage: React.FC<{
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
}> = ({ className = "", aspectRatio = "video" }) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[2/1]",
  };

  return (
    <div
      className={`bg-gray-700 rounded-lg animate-pulse ${aspectClasses[aspectRatio]} ${className}`}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 bg-gray-600 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export const SkeletonButton: React.FC<{
  className?: string;
  width?: string;
}> = ({ className = "", width = "w-24" }) => (
  <div
    className={`${width} h-10 bg-gray-700 rounded-lg animate-pulse ${className}`}
  ></div>
);

export const ShimmerEffect: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="relative overflow-hidden">
    {children}
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
  </div>
);

export default Loading;
