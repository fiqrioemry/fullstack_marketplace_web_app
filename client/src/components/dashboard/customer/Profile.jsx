import { useState } from "react";
import { profileControl } from "@/config";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/form/InputForm";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useFileUpload } from "@/hooks/useFileUpload";
import SingleUploadForm from "@/components/form/SingleUploadForm";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { updateProfile, profile, updating } = useUserStore();

  const profileForm = useFormSchema(profile, profileControl, updateProfile);

  const { singleUpload } = useFileUpload(
    profileForm.setFieldValue,
    profileForm.values,
    updateProfile
  );

  console.log(profile);

  const handleCancel = () => {
    profileForm.resetForm();
    setEditProfile(false);
  };

  const handleSave = async () => {
    await profileForm.submitForm();
    setEditProfile(false);
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-4">
        <div className="p-4 space-y-4 default_border">
          <div className="flex justify-center w-full">
            <div className="space-y-4 max-w-60">
              <div className="overflow-hidden">
                <img src={profile?.avatar} alt="avatar" />
              </div>
              <SingleUploadForm
                loading={updating}
                inputName="avatar"
                action={singleUpload}
                disabled={editProfile}
                buttonTitle="Change photo"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-8 ">
        <InputForm
          formik={profileForm}
          disabled={!editProfile}
          formControl={profileControl}
        >
          {editProfile && (
            <div className="space-x-4">
              <Button type="button" variant="cancel" onClick={handleCancel}>
                cancel
              </Button>
              <Button
                variant="save"
                type="button"
                onClick={handleSave}
                disabled={!profileForm.dirty || !profileForm.isValid}
              >
                save
              </Button>
            </div>
          )}
          {!editProfile && (
            <div>
              <Button
                type="button"
                variant="edit"
                onClick={() => setEditProfile(true)}
              >
                edit
              </Button>
            </div>
          )}
        </InputForm>
      </div>
    </div>
  );
};

export default Profile;
