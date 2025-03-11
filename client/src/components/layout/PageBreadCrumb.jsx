import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";

const PageBreadCrumb = () => {
  const location = useLocation();
  const navPath = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {navPath.map((path, index) => {
          const isLast = index === navPath.length - 1;
          const fullPath = `/${navPath.slice(0, index + 1).join("/")}`;

          return (
            <Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{decodeURIComponent(path)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={fullPath}>
                    {decodeURIComponent(path)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadCrumb;
