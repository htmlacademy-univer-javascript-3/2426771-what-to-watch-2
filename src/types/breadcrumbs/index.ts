export type BreadcrumbLink = {
    title: string;
    link: string;
}

export type Breadcrumbs = {
    links: BreadcrumbLink[];
    lastChild: string;
};
