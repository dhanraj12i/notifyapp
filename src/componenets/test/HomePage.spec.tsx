// HomePage.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HomePage } from "../HomePage";
import { useSnackbar } from "notistack";
import { aiRun } from "../../services/serviceAI";
import { removeSession } from "../../graphQL/appServices";
import AuthConsumer from "../../Context/AuthConsumer";

// Mock external dependencies
jest.mock("notistack", () => ({
  useSnackbar: jest.fn(),
}));

jest.mock("../../services/serviceAI", () => ({
  aiRun: jest.fn(),
}));

jest.mock("../../graphQL/appServices", () => ({
  removeSession: jest.fn(),
}));

jest.mock("../../Context/AuthConsumer", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("HomePage", () => {
  let enqueueSnackbar: jest.Mock;
  let setLoggedIn: jest.Mock;
  const mockSessionID = "mock-session-id";

  beforeEach(() => {
    enqueueSnackbar = jest.fn();
    setLoggedIn = jest.fn();
    (useSnackbar as jest.Mock).mockReturnValue({ enqueueSnackbar });
    (AuthConsumer as jest.Mock).mockReturnValue({ setLoggedIn });
    (localStorage.getItem as jest.Mock).mockReturnValue(mockSessionID);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(<HomePage />);
    expect(screen.getByText("output:-")).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(<HomePage />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test search" } });
    expect(input).toHaveValue("test search");
  });

  test("handles search button click", async () => {
    const mockResponse = "AI response";
    (aiRun as jest.Mock).mockResolvedValue(mockResponse);
    render(<HomePage />);
    const button = screen.getByText("search");
    fireEvent.click(button);
    await waitFor(() => {
      expect(aiRun).toHaveBeenCalled();
      expect(screen.getByText(mockResponse)).toBeInTheDocument();
      expect(enqueueSnackbar).toHaveBeenCalledWith(mockResponse, {
        variant: "success",
      });
    });
  });

  test("handles logout button click", async () => {
    const mockRemoveSessionResponse = "Session removed";
    (removeSession as jest.Mock).mockResolvedValue(mockRemoveSessionResponse);
    render(<HomePage />);
    const logoutButton = screen.getByText("logout");
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(removeSession).toHaveBeenCalledWith(mockSessionID);
      expect(localStorage.removeItem).toHaveBeenCalledWith("sessionID");
      expect(setLoggedIn).toHaveBeenCalledWith({});
      expect(enqueueSnackbar).toHaveBeenCalledWith("Logout Succesfully", {
        variant: "success",
      });
    });
  });

  test("does not render logout button when sessionID is null", () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);
    render(<HomePage />);
    expect(screen.queryByText("logout")).toBeNull();
  });
});
