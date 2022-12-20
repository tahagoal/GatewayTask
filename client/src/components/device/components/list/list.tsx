import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Device from 'src/models/device.model';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Toast } from 'react-bootstrap';

function DeviceList() {
  const [devices, setDevices] = useState([]);
  let { gatewayId } = useParams();
  const [show, setShow] = useState(false);


  const getallDevices = async () => {
    await axios
      .get(`${process.env.REACT_APP_MY_ENV_VARIABLE}devices/${gatewayId}`)
      .then(data => {
        setDevices(data.data);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getallDevices();
  },[])

  const deleteDevice = (id:string|undefined) => {
     axios
        .delete(`${process.env.REACT_APP_MY_ENV_VARIABLE}devices/${id}`)
        .then(data => {
          setShow(true);
          getallDevices();
        })
        .catch(error => console.log(error));
  }

  const { t } = useTranslation();


  return (
    <main>
      <Toast bg="danger" onClose={() => setShow(false)} show={show} delay={3000} autohide style={{position: "absolute", zIndex:"1000"}}>
        <Toast.Body className='text-white'>Device Deleted Successfully</Toast.Body>
      </Toast>
      <div className="container mt-4">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <h2 className="pt-3 pb-4 text-center font-bold font-up deep-purple-text">{t('devicetable')}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col mb-4">
                <button type="button" className="btn btn-primary float-right">
                  <Link className='text-white' to={'/devices/add/'+gatewayId}>
                    {t('addDevice')}
                  </Link>
                </button>
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t('uid')}</th>
                  <th>{t('vendor')}</th>
                  <th>{t('status')}</th>
                  <th>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device: Device, index: number) => (
                  <tr key={device._id}>
                    <td>{index+1}</td>
                    <td>{device.uid}</td>
                    <td>{device.vendor}</td>
                    {device.status && <td> {t('online')}</td>}
                    {!device.status && <td> {t('offline')}</td>}
                    <td>
                    <button type="button" className="btn btn-danger" onClick={() => deleteDevice(device._id)}>{t('deleteDevice')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </main>
  )
}

export default DeviceList
