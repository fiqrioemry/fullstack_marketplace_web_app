import { profileControl } from "@/config";
import { formatToRupiah } from "@/lib/utils";
import { formatDateToISO } from "@/lib/utils";
import { Calendar, DollarSign } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { Card, CardContent } from "@/components/ui/card";
import ChangeAvatar from "@/components/form/ChangeAvatar";
import { DialogForm } from "@/components/form/DialogForm";

const AccountProfileSettings = () => {
  const { updateProfile, profile, loading } = useUserStore();
  const profileForm = useFormSchema(updateProfile, profile, profileControl);

  return (
    <Card className="col-span-1 w-full max-w-sm rounded-lg shadow-none p-4">
      <div className="flex flex-col items-center text-center mb-8">
        <img
          alt="Avatar"
          src={profile.avatar}
          className="w-24 h-24 rounded-full border-4"
        />
        <h4>{profile.fullname}</h4>
        <span>{profile.email}</span>
      </div>

      <CardContent className="p-0 space-y-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Account Balance
          </div>
          <span className="w-1/2">: {formatToRupiah(profile.balance)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Joined Date
          </div>
          <span className="w-1/2">: {formatDateToISO(profile.createdAt)}</span>
        </div>
      </CardContent>

      <div className="flex justify-between gap-2">
        <DialogForm
          size="default"
          state={profile}
          action={updateProfile}
          control={profileControl}
          textButton="Edit Profile"
          title="Edit Profile Form"
        />

        <ChangeAvatar
          form={profileForm}
          disabled={loading}
          action={updateProfile}
        />
      </div>
    </Card>
  );
};

export default AccountProfileSettings;
