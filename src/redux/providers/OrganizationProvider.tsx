import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrganizationListQuery } from "../services/admin";
import { setOrganization } from "../slices/global";
import { RootState } from "../store";

type Props = {
  children: React.ReactElement;
};

export const OrganizationProvider = ({ children }: Props) => {
  const dispatch = useDispatch();
  const org_id = useSelector((state: RootState) => state.global.org_id);
  
  const { data, isLoading } = useGetOrganizationListQuery();

  useEffect(() => {
    if (data?.data) {
      dispatch(setOrganization(data?.data[0].id));
    }
  }, [data]);

  if (isLoading || !org_id) {
    return null;
  }

  return children;
};
