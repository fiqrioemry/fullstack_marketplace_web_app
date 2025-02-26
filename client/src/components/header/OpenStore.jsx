const OpenStore = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Store />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          You Dont Have Store
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button onClick={() => navigate("/open-store")} className="w-full">
            Open Store
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OpenStore;
