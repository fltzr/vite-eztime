import { type UIMatch, useMatches } from "react-router-dom";

export const AppInnerHeader = () => {
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[]

  const headerTitle = matches[matches.length - 1]?.handle?.title;
  return (
    <div className='w-full h-[57px] border-b border-black'>{ headerTitle }</div>
  )
}