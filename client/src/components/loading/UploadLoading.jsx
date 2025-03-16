import { DialogContent } from "@/components/ui/dialog";

const UploadLoading = () => {
  return (
    <DialogContent className="sm:max-w-[425px] rounded-lg flex h-96 items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 rounded-full animate-spin"></div>
        <h4 className="text-muted-foreground mt-4">
          Uploading, please wait...
        </h4>
      </div>
    </DialogContent>
  );
};

export default UploadLoading;
