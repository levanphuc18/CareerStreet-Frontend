import React, { createContext, useContext, useState } from "react";
import authApiRequest from "../apiRequest/auth";
import { AccountListResType } from "../schemaValidations/account.chema";

type AccountContextType = {
  getAccountsListByRoleId: (
    roleId: number,
    sessionToken: string
  ) => Promise<void>;
  accountsList: { [roleId: number]: AccountListResType["data"] | null };
};

const AccountContext = createContext<AccountContextType>({
  getAccountsListByRoleId: async () => {},
  accountsList: {},
});

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accountsList, setAccountsList] = useState<{
    [roleId: number]: AccountListResType["data"] | null;
  }>({});
  
  const getAccountsListByRoleId = async (
    roleId: number,
    sessionToken: string
  ) => {
    // Nếu đã có dữ liệu cho roleId, không cần fetch lại
    if (accountsList[roleId]) return;

    try {
      const accountsResult = await authApiRequest.getAccountByRoleId(
        roleId,
        sessionToken
      );

      const newAccounts = Array.isArray(accountsResult.payload.data)
        ? accountsResult.payload.data
        : [accountsResult.payload.data];

      setAccountsList((prev) => ({
        ...prev, // Giữ nguyên dữ liệu trước đó
        [roleId]: newAccounts, // Gán danh sách mới cho roleId
      }));
    } catch (error) {
      console.error(
        `An error occurred while fetching accounts for roleId=${roleId}:`,
        error
      );
    }
  };

  
  return (
    <AccountContext.Provider
      value={{
        getAccountsListByRoleId,
        accountsList,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => useContext(AccountContext);
