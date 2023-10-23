import { Link } from "react-router-dom";

function Admin() {
  const adminLinks = [
    { name: "View Products", to: "products" },
    { name: "Add Product", to: "add-product" },
    { name: "Add Card", to: "add-card" },
    { name: "Edit Product", to: "edit-product" },
    { name: "Edit Card", to: "edit-card" },
    { name: "Delete Product", to: "delete-product" },
    { name: "Delete Card", to: "delete-card" },
  ];

  return (
    <div className="w-screen h-screen">
      <div className="bg-cover bg-center bg-no-repeat bg-slate-100 h-full w-full">
        <div className="container mx-auto flex flex-col my-auto align-middle h-full">
          <div className="mx-auto my-auto w-10/12 h-3/5 md:w-2/5 flex flex-col">
            <h1 className="text-4xl mb-20">Administrators Only</h1>
            <div className="flex flex-col items-start md:w-1/15 sm:w-4/5">
              {adminLinks.map(({ name, to }) => (
                <span
                  className="mb-3 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                  key={name}
                >
                  <Link to={to}>{name}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
