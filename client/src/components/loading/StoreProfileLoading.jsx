const StoreProfileLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen transition-colors duration-300 bg-background">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 rounded-full animate-spin"></div>
        <h4 className="text-muted-foreground mt-4">Loading, please wait...</h4>
      </div>
    </div>
  );
};

export default StoreProfileLoading;
