import React from "react"
import { useSelector } from "react-redux";
import { Role } from "src/redux/services/enums/role.enum"
import { RootState } from "src/redux/store";

type Props = {
  children: React.ReactElement,
  roles: Role[]
}

export default function RoleAccess({ children, roles }: Props) {
    const user = useSelector((state: RootState) => state.global.user);

    if (user?.role && roles.includes(user?.role)) return children;
    return null;
}