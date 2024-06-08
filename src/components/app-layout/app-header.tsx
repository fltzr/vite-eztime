import { ReactNode } from "react";
import { type UIMatch, useMatches } from "react-router-dom";

export const AppHeader = ({
  middleContent,
  rightContent,
}: {
  middleContent?: ReactNode;
  rightContent?: ReactNode;
}) => {
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];

  const headerTitle = matches[matches.length - 1]?.handle?.title;
  return (
    <div className="w-full h-[57px] border-b border-black">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex-grow-0 flex-shrink-0">
          <span className="text-lg font-semibold">{headerTitle}</span>
        </div>
        <div className="flex-grow flex-shrink justify-center">
          {middleContent}
        </div>
        <div className="flex-grow-0 flex-shrink-0">{rightContent}</div>
      </div>
    </div>
  );
};
