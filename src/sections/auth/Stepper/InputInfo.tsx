import InfoIcon from "@mui/icons-material/Info";
import * as React from "react";

type InputInfoProps = {
	text: string;
}

export default function InputInfo({text}: InputInfoProps) {
	return (
		<div style={{display: 'flex', alignItems: 'center', fontSize: '14px', color: '#04297A'}}>
			<InfoIcon sx={{color: '#1554F6', mr: 1}}/>
			{text}
		</div>
		)
}
