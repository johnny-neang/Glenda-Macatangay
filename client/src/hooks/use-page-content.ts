import { useQuery } from "@tanstack/react-query";

export function usePageContent(pageKey: string) {
  return useQuery({
    queryKey: ["page-content", pageKey],
    queryFn: async () => {
      const res = await fetch(`/api/content/${pageKey}`);
      if (!res.ok) {
        return { content: "" };
      }
      const data = await res.json();
      return data;
    },
    staleTime: 1000 * 30,
  });
}

export function useMultiplePageContent(pageKeys: string[]) {
  return useQuery({
    queryKey: ["page-content-multiple", pageKeys],
    queryFn: async () => {
      const results = await Promise.all(
        pageKeys.map(async (key) => {
          const res = await fetch(`/api/content/${key}`);
          if (!res.ok) {
            return { pageKey: key, content: "" };
          }
          return res.json();
        })
      );
      return results.reduce((acc, item) => {
        acc[item.pageKey] = item.content || "";
        return acc;
      }, {} as Record<string, string>);
    },
    staleTime: 1000 * 30,
  });
}
