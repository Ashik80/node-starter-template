// export type PageData = {
//   title: string;
//   layout: string;
//   page: string;
//   path: string;
// };
//
// export function newPageData() {
//   return {
//     title: "",
//     layout: "main",
//     page: "",
//     path: "",
//   };
// }

export class PageData {
  title: string;
  layout: string;
  page: string;
  path: string;

  constructor(page: string, title: string, path: string, layout?: string) {
    this.title = title;
    this.page = page;
    this.path = path;
    this.layout = layout || "main";
  }
}
