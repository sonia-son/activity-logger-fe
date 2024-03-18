import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import GradeIcon from '@mui/icons-material/Grade';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
// import { LeetcodeLogo } from '../images/leetcode';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSignOut } from '../hooks/useSignOut';
import { useFavoriteGroup } from '../hooks/useFavoriteGroup';
import { useUserContext } from '../contexts/UserContext';
import { useActivityGroupContext } from '../contexts/ActivityGroupContext';

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  const { activityGroups, currentGroup, setCurrentGroup } =
    useActivityGroupContext();
  const { user, setIsLogin, setUser } = useUserContext();
  const { signOut } = useSignOut();
  const { setFavoriteGroup, getFavoriteGroup } = useFavoriteGroup();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [favorite, setFavorite] = useState<string>('');
  const open = Boolean(anchorEl);
  const [anchorGroupEl, setAnchorGroupEl] = React.useState<null | HTMLElement>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const result = await getFavoriteGroup();
        setFavorite(result.groupname);
      } catch (e) {
        //
      }
    };
    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openGroup = Boolean(anchorGroupEl);

  const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickFavorite = (event: React.MouseEvent<SVGSVGElement>) => {
    setFavoriteGroup({ groupname: currentGroup.groupname });
    setFavorite(currentGroup.groupname);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = async () => {
    try {
      await signOut();
      setUser('');
      setIsLogin(false);
    } catch (e) {
      //
    }
  };
  const handleClickGroup = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorGroupEl(event.currentTarget);
  };
  const handleCloseGroup = () => {
    setAnchorGroupEl(null);
  };
  const handleSelectGroup = ({
    groupname,
    logoUrl,
  }: {
    groupname: string;
    logoUrl: string;
  }) => {
    setAnchorGroupEl(null);
    setCurrentGroup({ groupname, logoUrl });
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(248, 249, 250)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '10px',
        }}
      >
        <Box
          sx={{ width: '30px', height: '30px' }}
          component='img'
          src={currentGroup.logoUrl ?? 'dotogether.webp'}
        ></Box>
        <Typography>{currentGroup.groupname}</Typography>
        {user && (
          <>
            <Box sx={{ cursor: 'pointer', ml: '4px' }}>
              {currentGroup.groupname === favorite ? (
                <Tooltip title='Current favorite group'>
                  <GradeIcon color='warning' />
                </Tooltip>
              ) : (
                <Tooltip title='Set favorite group'>
                  <StarOutlineIcon onClick={handleClickFavorite} />
                </Tooltip>
              )}
            </Box>
            <IconButton onClick={handleClickGroup}>
              <ArrowDropDownIcon />
            </IconButton>
          </>
        )}

        <Menu
          anchorEl={anchorGroupEl}
          open={openGroup}
          onClose={handleCloseGroup}
        >
          {activityGroups.map((group) => {
            return (
              <MenuItem key={group.id} onClick={() => handleSelectGroup(group)}>
                {group.groupname}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
      <Box sx={{ padding: '4px 16px' }}>
        {user && (
          <>
            <Avatar
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={handleClickAvatar}
            >
              {user.slice(0, 2).toUpperCase()}
            </Avatar>
            <Menu open={open} anchorEl={anchorEl} onClose={handleCloseMenu}>
              <MenuItem onClick={handleClickLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize='small' />
                  <ListItemText sx={{ ml: '16px', mr: '16px' }}>
                    Log out
                  </ListItemText>
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
