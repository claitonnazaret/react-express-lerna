import { Collapse, Icon, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { IDrawerOptionListItem } from '../../contexts';
import uuid from 'react-uuid';

export const ListItemLink: React.FC<IDrawerOptionListItem> = ({
    path,
    icon,
    label,
    onClick,
    children,
    ...otherProps
}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const resolverPath = useResolvedPath(path ?? '');
    const match = useMatch({ path: resolverPath.pathname, end: false });

    const handleCollapse = () => {
        setOpen(!open);
    };
    const handleClick = () => {
        navigate(`${path}`);
        onClick?.();
    };

    return (
        <>
            {!children?.length ? (
                <ListItemButton {...otherProps} selected={!!match} onClick={handleClick}>
                    <ListItemIcon>
                        <Icon>{icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={label} />
                </ListItemButton>
            ) : (
                <>
                    <ListItemButton onClick={handleCollapse}>
                        <ListItemIcon>
                            <Icon>{icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={label} />
                        <Icon>{open ? 'expand_less' : 'expand_more'}</Icon>
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {children.map((option) => (
                                <ListItemLink key={uuid()} {...option} />
                            ))}
                        </List>
                    </Collapse>
                </>
            )}
        </>
    );
};
