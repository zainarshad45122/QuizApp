/*eslint-disable*/
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function HeaderLink(props) {
	const classes = useStyles();
	const { auth } = props;

	let profileContent;
	if (auth.isAuthenticated) {
	
			profileContent = (
				<span>
					<ListItem className={classes.listItem}>
						<span>
							<Button href="/quiz" color="transparent" target="_blank">
								Quiz
							</Button>
						</span>
					</ListItem>
				</span>
			);
		
	} else {
		profileContent = <span></span>;
	}
	return (
		<List className={classes.list}>
			<ListItem className={classes.listItem}></ListItem>
			<ListItem className={classes.listItem}>
				{auth.isAuthenticated ? (
					<span></span>
				) : (
					<span>
						<Button href="/login" color="transparent" target="_blank">
							Login
						</Button>
					</span>
				)}
			</ListItem>
			<ListItem className={classes.listItem}>
				{auth.isAuthenticated ? (
					<span>
						<Button color="transparent" onClick={props.onLogoutClick}>
							Logout
						</Button>
					</span>
				) : (
					<span></span>
				)}
			</ListItem>
			<ListItem className={classes.listItem}>
				{/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
			</ListItem>
			{profileContent}
		</List>
	);
}
