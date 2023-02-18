import { useSnackbar } from "notistack";

const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showMessage = (message: JSX.Element | string) => {
    enqueueSnackbar(message, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const showWarning = (message: JSX.Element | string) => {
    enqueueSnackbar(message, {
      variant: "warning",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      style: { whiteSpace: "pre-line" },
    });
  };

  const showError = (message: JSX.Element | string) => {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  return {
    showMessage,
    showError,
    showWarning,
  };
};

export default useMessage;
