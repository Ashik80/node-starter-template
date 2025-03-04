export type PageData = {
  title: string;
  layout: string;
  page: string;
  path: string;
};

export function newPageData() {
  return {
    title: "",
    layout: "main",
    page: "",
    path: "",
  };
}
