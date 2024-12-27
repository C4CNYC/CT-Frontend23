import React from 'react';
import { accessControlApi  } from '@/redux/services/public/access-control-public';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

type AccessControlTableType = React.FC<{userId: string}>

export const UserAccessControlTable: AccessControlTableType = ({ userId }) => {
  const {
    useGetAllFeaturesQuery,
    useGetByUserIdQuery,
    useAddFeatureMutation, } = accessControlApi;

  const { data: accessData } = useGetAllFeaturesQuery();
  const { data: userAccessData } = useGetByUserIdQuery({ userId });
  
  const [addFeature] = useAddFeatureMutation(); 
 console.log(accessData, userAccessData);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Feature</TableCell>
            <TableCell>Max Usage Count</TableCell>
            <TableCell>User ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accessData?.map((accessControl) => (
            <TableRow key={accessControl.id}>
              <TableCell>{accessControl.id}</TableCell>
              <TableCell>{accessControl.feature}</TableCell>
              <TableCell>{accessControl.maxUsageCount}</TableCell>
              <TableCell>{accessControl.userId === userId ? accessControl.userId : 'No Access'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
 
