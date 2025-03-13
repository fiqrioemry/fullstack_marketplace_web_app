import { formatToRupiah } from "@/lib/utils";
import { formatDateToISO } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useFormSchema } from "@/hooks/useFormSchema";
import { Card, CardContent } from "@/components/ui/card";
import UploadButton from "@/components/form/UploadButton";

const DisplayCard = () => {
  const { updateProfile, profile, loading } = useUserStore();
  const profileForm = useFormSchema(updateProfile, profile);

  const { singleFile } = useFileUpload(
    profileForm.setFieldValue,
    profileForm.values,
    updateProfile
  );
  return (
    <Card className="col-span-1 w-full max-w-sm rounded-lg shadow-none p-4">
      <div className="flex flex-col items-center text-center">
        <img
          alt="Avatar"
          src={profile.avatar}
          className="w-24 h-24 rounded-full border-4"
        />
        <h2>{profile.fullname}</h2>
        <h5>{profile.email}</h5>
      </div>

      <CardContent className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Account Balance
          </div>
          <span className="w-1/2">: {formatToRupiah(profile.balance)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex  items-center gap-2">
            <Calendar className="w-5 h-5" />
            Joined Date
          </div>
          <span className="w-1/2">: {formatDateToISO(profile.createdAt)}</span>
        </div>
      </CardContent>

      <div className="flex justify-between gap-2">
        <Button variant="edit" className="w-full">
          Edit Profile
        </Button>
        <UploadButton
          title="Change Avatar"
          loading={loading}
          inputName="avatar"
          action={singleFile}
          disabled={loading}
        />
      </div>
    </Card>
  );
};

export default DisplayCard;
