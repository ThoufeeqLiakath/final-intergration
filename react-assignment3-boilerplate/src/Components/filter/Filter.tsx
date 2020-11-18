import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import { Typography, Grid } from '@material-ui/core';
// import Pagination from '@material-ui/lab/Pagination';
import FilterModel from '../../model/FilterModel';
//@ts-ignore
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
    },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  
}));

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function Filter(props:any) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);  
  const [open, setOpen] = React.useState(true);
  const [endPoint, setEndPoint] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [keyword,setKeyword]=React.useState('a');
  const [sources,setSources]=React.useState('');
  const [slider,setSlider]=React.useState(20);
  const history= useHistory();
  useEffect(() => {
    // Update the document title using the browser API
    if(endPoint==='')
  {
    setEndPoint("Everything");
  }
  },[endPoint]);
  
  if(localStorage.getItem('token')===null||localStorage.getItem('token')===undefined){
    history.push('/login');
  }

  const handleOnChangeSlider= (event:any, value:any) => {
    setSlider(value);
  };
  const handleChangePagination = (event:any) => {
    setPage(event.target.value);
  };
  const handleChangeEndpoint=(e:any)=>
  {
    setEndPoint(e.target.value);
    if(e.target.value==="Everything")
    {
      setCountry('');
    }
  };
  const handleChangeCatogory=(e:any)=>
  {
    setCategory(e.target.value);
  };
  const handleChangeCountry=(e:any)=>
  {
    setCountry(e.target.value);
    setKeyword('');
  };
  const handleOnChangeKeyword=(e:any)=>
  {
    setKeyword(e.target.value);
  };

  const handleOnChangeSources=(e:any)=>
  {
    setSources(e.target.value);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    props.filterButtonDisplayCallback(false);
  };

  const handleSave=()=>{
    let filterModel=new FilterModel(endPoint,sources,keyword,category,country,page,slider);
    
    props.getFilterDetailsCallBack(filterModel);
    // //console.log(filterModel);
    handleClose();
  };
  // console.info('sources',sources);
  // console.info('keyword',keyword);
  // console.info('endPoint',endPoint);
  

  return (
    <div style={{marginTop:80}}>
      {/* <Button onClick={handleClickOpen}>Open select dialog</Button> */}
      <Dialog id="filterdialog" disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select the filters</DialogTitle>
        <DialogContent>
        <Grid container>
            <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Endpoints</InputLabel>
              <Select
                native
                value={endPoint}
                id="EndPointFilter"
                defaultValue="Everything"
                onChange={handleChangeEndpoint}
                input={<Input id="demo-dialog-native" />}
              >
                
                <option value={"Everything"}>Everything</option>
                <option value={"Top"}>Top headlines</option>                
                <option value={"Sources"}>Sources</option>
              </Select>
            </FormControl>
            </Grid></Grid>
            {(sources===""&&endPoint!=="Everything")?           
            
            <Grid container><Grid item xs={12}><FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Country</InputLabel>
              <Select
              native
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={country}
                onChange={handleChangeCountry}
                input={<Input />}
              >
                
                <option value="">
                  
                </option>
                {/* <option value="ae">ae</option> */}
                <option value="ar">Argentina</option>
                {/* <option value="at">at</option>
                <option value="au">au</option>
                <option value="be">be</option>
                <option value="bg">bg</option>
                <option value="br">br</option> */}
                <option value="ca">Canada</option>
                {/* <option value="ch">ch</option>
                <option value="cn">cn</option>
                <option value="co">co</option>
                <option value="cu">cu</option>
                <option value="de">de</option>
                <option value="eg">eg</option>                 */}
                <option value="gb">Great Britain</option>
                {/* <option value="gr">gr</option>
                <option value="hk">hk</option>
                <option value="hu">hu</option>
                <option value="id">id</option>
                <option value="ie">ie</option>
                <option value="il">il</option> */}
                <option value="in">India</option>
                {/* <option value="it">it</option>
                <option value="jp">jp</option>
                <option value="kr">kr</option>
                <option value="lt">lt</option>
                <option value="lv">lv</option>
                <option value="ma">ma</option>
                <option value="mx">mx</option>
                <option value="my">my</option>
                <option value="ng">ng</option> */}
                <option value="nl">Netherlands</option>
                {/* <option value="no">no</option>
                <option value="nz">nz</option>
                <option value="ph">ph</option>
                <option value="pl">pl</option>
                <option value="pt">pt</option>                
                <option value="ro">ro</option>
                <option value="rs">rs</option>
                <option value="ru">ru</option>
                <option value="sa">sa</option>
                <option value="se">se</option>
                <option value="sg">sg</option>
                <option value="si">si</option>
                <option value="sk">sk</option>
                <option value="th">th</option>
                <option value="tr">tr</option>
                <option value="tw">tw</option>
                <option value="ua">ua</option> */}
                <option value="us">USA</option>
                {/* <option value="ve">ve</option>
                <option value="za">za</option> */}
              </Select>
            </FormControl></Grid></Grid>
            :null}
            {(sources===""&&endPoint!=="Everything")?
            <Grid container><Grid item xs={12}> <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Category</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={category}
                onChange={handleChangeCatogory}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"business"}>business</MenuItem>
                <MenuItem value={"entertainment"}>entertainment</MenuItem>
                <MenuItem value={"general"}>general</MenuItem>
                <MenuItem value={"health"}>health</MenuItem>
                <MenuItem value={"science"}>science</MenuItem>
                <MenuItem value={"sports"}>sports</MenuItem>
                <MenuItem value={"technology"}>technology</MenuItem>
              </Select>
            </FormControl></Grid></Grid>
            :null}
            <Grid container><Grid item xs={12}><FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Keywords</InputLabel>
              <Input type="text"
                id="keywords"
                onChange={handleOnChangeKeyword}
                value={keyword}></Input>
            </FormControl></Grid></Grid>
            {(country==="" && category==="")?
            <Grid container><Grid item xs={12}><FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Sources</InputLabel>
              <Input type="text" id="sourcesFilter"
              onChange={handleOnChangeSources}
              value={sources}></Input>
            </FormControl></Grid></Grid>
            :null}
            <Grid container><Grid item xs={12}><FormControl className={classes.formControl}>
                <Typography gutterBottom>Pagesize </Typography>
                <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" min={1} max={100} defaultValue={20} onChange={handleOnChangeSlider} id="pageslider" />
            </FormControl></Grid></Grid>
            <Grid container> <Grid item xs={12}><FormControl className={classes.formControl}>
                <Typography>Page: {page}</Typography>
                {/* <Pagination count={10} page={page} onChange={handleChangePagination} /> */}
                <Input type="number"                
                id="pagenumber"
                value={page}
                onChange={handleChangePagination}></Input>
            </FormControl></Grid></Grid>            
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="save" onClick={handleSave} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
