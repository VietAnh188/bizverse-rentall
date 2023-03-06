import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { Component } from 'react';

import s from './SiteSettingsForm.css';
import bt from '../../../components/commonStyle.css';

import cx from 'classnames';
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox';
import { connect } from 'react-redux';

import { startMaintenance } from '../../../actions/maintenance/startMaintenance';
import { stopMaintenance } from '../../../actions/maintenance/stopMaintenance';
import moment from 'moment';

class MaintenanceArea extends Component {

    state = {
        isMaintenance: this.props.maintenanceList?.active,
        buttonActive:  this.props.maintenanceList?.active,
        type: this.props.nameMaintenance,
        description: '',
        startTime: this.props.maintenanceList?.active? this.props.maintenanceList?.startTime: '',
        endTime: this.props.maintenanceList?.active? this.props.maintenanceList?.endTime: '',
    }

    renderButtonMaintenance(active) {
        if(this.state.isMaintenance && active || this.state.isMaintenance && this.state.buttonActive ) {
          return <button name='stopButton'  type='button' onClick={(e)=>{this.onClickMaintenance(e)}} className={cx(bt.btnPrimary, s.btnStop)}>Stop</button>
        } else if (this.state.isMaintenance && !active || this.state.isMaintenance && !this.state.buttonActive) {
          return <button name='startButton'  type='button' onClick={(e)=>{this.onClickMaintenance(e)}} className={cx(bt.btnPrimary, s.btnStop)}>Start</button>
        } if (!this.state.isMaintenance) return "";
      }
    
    onClickMaintenance = async (e) => {
        const { startMaintenance, stopMaintenance } = this.props;
        const {type, startTime, endTime, description} = this.state;
        let formatStartTime= startTime? this.formatTimeDate(startTime): '';
        let formatEndTime= endTime? this.formatTimeDate(endTime): '';

        if(e.target.name === 'startButton'){
            await startMaintenance({type, description, startTime: formatStartTime, endTime: formatEndTime});
            const { infoStartMaintenance } = this.props;
            if(infoStartMaintenance && infoStartMaintenance.statusMaintenance) {
                this.setState({buttonActive: true})
            }
                
        } else {
            await stopMaintenance({type});
            const { infoStopMaintenance } = this.props;

            if(infoStopMaintenance && !infoStopMaintenance.statusMaintenance) {
                this.setState({buttonActive: false})
            }
        }
        
    }

    onChangeTimeInput(e) {
        let time = e.target.value;
        let name = e.target.name;

        this.setState({[name]:time, description:''})
    }

    formatTimeDate(timeDate) {
        let newTimeDate = new Date(moment(timeDate)).getTime().toString();
    
        return newTimeDate;
    }
    
    formatTime(timeDate) {
        let newTimeDate = moment(timeDate).format("YYYY-MM-DD HH:mm:ss");

        return newTimeDate;
    }

    
    contentMaintenancing() {
        const {startTime, endTime} = this.state;
        let nowTimeDate = this.formatTime(new Date());
        let formatStartTime = this.formatTime(startTime);
        let formatEndTime = this.formatTime(endTime);

        return <div>
                    <span className={s.textMaintenancing}>Maintenancing...</span>
                    <span className={s.textMaintenancing}>
                        <b>Start:</b> {startTime? formatStartTime : nowTimeDate }
                        {endTime && <span className={s.endTime}> <b>Finish:</b>  {formatEndTime}</span>}
                    </span>  

                </div>
        
    }

    render() {
        const { maintenanceList, nameMaintenance } = this.props;
        return (
            <div className={s.maintenanceItem}>
                <div className={s.spaceCheckbox}>
                <CustomCheckbox
                    value={nameMaintenance}
                    checked={this.state.isMaintenance}
                    className={'icheckbox_square-green'}
                    onChange={()=>{this.setState({isMaintenance: !this.state.isMaintenance}) }}
                />
                <span className={s.textSpace}>Maintenance {nameMaintenance}</span>
                {this.renderButtonMaintenance(maintenanceList?.web?.active)}
                {this.state.buttonActive && this.contentMaintenancing()}
                
                </div>
                {!this.state.buttonActive && 
                    <div className={cx(s.hideClass, {[s.setTime]: this.state.isMaintenance})}>
                        <div className={s.textTime}>
                            <span className={s.titleTime}><b>Time start</b></span>
                            <input name='startTime' onChange={(e)=>this.onChangeTimeInput(e)} className type='datetime-local'/>
                        </div>
                        <div className={s.textTime}>
                            <span className={s.titleTime}><b>Time end</b></span>
                            <input name='endTime' onChange={(e)=>this.onChangeTimeInput(e)} className type='datetime-local'/>
                        </div>
                    </div> }
                
                
            </div>
        );
    }
}
const mapState = (state) => ({
    infoStartMaintenance: state.startMaintenance,
    infoStopMaintenance: state.stopMaintenance

})

const mapDispatch = {
    startMaintenance,
    stopMaintenance
};
export default withStyles(s, bt)(connect(mapState, mapDispatch)((MaintenanceArea)));