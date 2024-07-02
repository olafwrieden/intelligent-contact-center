import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WrapUpProps {
  children?: React.ReactNode;
}

const WrapUp = ({}: WrapUpProps) => {
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </div>
  );
};

export default WrapUp;
