import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';


function BottomnNavigation(){
    const [value, setValue] = React.useState(0);
    return(
        
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
    </BottomNavigation>
    );
    
}

export default BottomnNavigation;