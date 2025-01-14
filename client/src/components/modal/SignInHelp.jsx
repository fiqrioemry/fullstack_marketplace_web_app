/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export function SignInHelp({ button }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-primary font-bold hover:text-primary/80 duration-300">
          {button}
        </button>
      </DialogTrigger>
      <DialogTitle>
        <DialogContent variant="options" className=" sm:max-w-[525px]">
          <div className="h-40 w-full flex flex-col items-center justify-center space-y-6">
            <h5>What kind of help do you need ?</h5>
            <Button onClick={() => toast("This feature disabled in demo")}>
              Reset Password
            </Button>
            {/* <Link
              to="/reset-password"
              className="w-full py-2 px-4 rounded-md border bg-primary text-background flex items-center justify-center hover:bg-primary/80 duration-300 transition-all"
            >
              Reset password
            </Link> */}
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
