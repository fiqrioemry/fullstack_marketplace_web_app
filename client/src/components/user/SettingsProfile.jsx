import { useState } from "react";
import { profileControl } from "@/config";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/FormInput";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";

const SettingsProfile = () => {
  const { updateProfile, profile } = useUserStore();
  const [editProfile, setEditProfile] = useState(false);
  const profileForm = useFormSchema(updateProfile, profile, profileControl);

  const handleCancel = () => {
    profileForm.resetForm();
    setEditProfile(false);
  };

  const handleSave = async () => {
    await profileForm.submitForm();
    setEditProfile(false);
  };
  return (
    <div className="col-span-2">
      <FormInput
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
          <Button
            type="button"
            variant="edit"
            onClick={() => setEditProfile(true)}
          >
            edit
          </Button>
        )}
      </FormInput>
    </div>
  );
};

export default SettingsProfile;
