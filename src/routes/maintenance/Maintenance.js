import React from 'react';
import s from './Maintenance.css';
import MaintenanceImg from '../../../public/SiteImages/maintenance.svg';
import MaintenanceImgNoPeople from '../../../public/SiteImages/maintenance-no-people.svg';
import MaintenanceLogo from '../../../public/SiteIcons/maintenance-logo.png';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Maintenance extends React.Component {
  
    render() {
  
      return (
        <div className={s.container}>
            <img className={s.image} src={MaintenanceImg} />
            <img className={s.imageNoPeople} src={MaintenanceImgNoPeople} />
            <div className={s.descArea}>
                <img className={s.logo} src={MaintenanceLogo} />
                  <h1 className={s.heading}>QUICK MAINTENANCE</h1>
                <p className={s.paragraph}>Sorry for the inconvenience</p>
            </div>
        </div>
      );
    };
  };

export default withStyles(s)(Maintenance);
