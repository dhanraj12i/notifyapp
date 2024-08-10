import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { notifyInfo } from "./constants";
type NotifyInfoType = (typeof notifyInfo)[keyof typeof notifyInfo];

const enqueueMessage = (msg: string, type: NotifyInfoType) => {
  return enqueueSnackbar(msg, { variant: type });
};

export { SnackbarProvider, enqueueMessage };
