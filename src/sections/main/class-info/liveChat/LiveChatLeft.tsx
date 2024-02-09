import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useTranslate } from "src/utils/translateHelper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Grid, ListItemIcon } from "@mui/material";
import { useGetClassStudentsQuery } from "src/redux/services/manager/classes-student";
import { useRouter } from "next/router";
import { IStudent } from "src/redux/services/interfaces/user.interface";
import { useSelector } from "src/redux/store";

export default function LiveChatLeft() {
	const translate = useTranslate()

	const [tableData, setTableData] = useState<IStudent[]>([]);
	const user = useSelector((state) => state.global.user);

	const { query } = useRouter();

	const { data, isLoading, isFetching } = useGetClassStudentsQuery(
		{ id: query.id as string },
	);

	useEffect(() => {
		setTableData(data?.data ?? []);
	}, [
		data,
	]);

	return (
		<Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
			<List>
				<ListItem button>
					<ListItemIcon>
						<Avatar alt={user?.first_name} src={user?.avatar} />
					</ListItemIcon>
					<ListItemText primary={user?.first_name}></ListItemText>
				</ListItem>
			</List>
			<Divider />
			<Grid item xs={12} style={{ padding: '10px' }}>
				<TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
			</Grid>
			<Divider />
			<List sx={{ paddingTop: 0 }}>
				<ListItem button sx={{
					padding: '16px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%'
				}}>
					<Box sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}>
						<ListItemIcon sx={{
							width: '30px',
							height: '30px',
							marginRight: '5px'
						}}>
							<Avatar sx={{
								width: '30px',
								height: '30px'
							}} alt="R" src="R" />
						</ListItemIcon>
						<ListItemIcon sx={{
							width: '30px',
							height: '30px',
							marginRight: '5px'
						}}>
							<Avatar sx={{
								width: '30px',
								height: '30px'
							}} alt="G" src="G" />
						</ListItemIcon>
						<ListItemText primary="... + 2">... + 2</ListItemText>
					</Box>
					<ListItemText primary="Group Chat #1" sx={{textAlign: 'right'}}>Group Chat #1</ListItemText>
				</ListItem>
				<Divider />
				{tableData?.map((item: IStudent, idx: number) => {
					const name = item?.first_name || item?.account?.first_name
					return user?.id !== item?.account?.id ? <ListItem button key={item.id || idx} sx={{padding: '16px'}}>
						<ListItemIcon>
							<Avatar alt={name} src={item?.avatar} />
						</ListItemIcon>
						<ListItemText primary={name}>{name}</ListItemText>
						<ListItemText secondary="online" sx={{ textAlign: 'right' }}></ListItemText>
					</ListItem> : null
				})}
			</List>
		</Grid>
	);
}