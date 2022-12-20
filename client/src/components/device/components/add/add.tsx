import { useEffect, useState } from 'react'
import { Card, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Device from 'src/models/device.model';
import axios from "axios";
import Toast from 'react-bootstrap/Toast';

function DeviceAdd() {

  let { gatewayId } = useParams();
  let id: string = gatewayId ? gatewayId : '';
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
    }
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { t } = useTranslation();

  const onSubmit = (data: any) => {

    const device: Device = new Device(data.vendor, id, data.status);
    device.uid = Math.floor(Math.random() * 90000) + 10000;

    axios
      .post(`${process.env.REACT_APP_MY_ENV_VARIABLE}devices`, device)
      .then(data => {
        setShow(true);
      })
      .catch(error => console.log(error));
  }

  return (

    <main>
      <Toast bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide style={{ position: "absolute", zIndex: "1000" }}>
        <Toast.Body className='text-white'>Device Created Successfully</Toast.Body>
      </Toast>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <div className="col-md-12">
                <h2 className="pt-3 pb-4 text-center font-bold font-up deep-purple-text">{t('addDevice')}</h2>
              </div>
            </Row>
            <div className="row">
              <div className="col mb-4">
                <button type="button" className="btn btn-primary float-end">
                  <Link className='text-white' to={'/devices/list/' + gatewayId}>
                    {t('backtoList')}
                  </Link></button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 justify-content-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label className='mb-2 float-start'>{t('vendor')}</label>
                    <input type="text"
                      className="form-control"
                      id="vendor"
                      {...register("vendor", { required: true })}
                    />
                    <div className='col-sm-12'>
                      {errors.vendor && <small className="text-danger">{t('requiredField')}</small>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{t('status')}</label>
                    <select className="form-select form-control"
                      id="status"
                      {...register("status", { required: true })}
                    >
                      <option value="1">Online</option>
                      <option value="0">Offline</option>
                    </select>
                    <div className="col-sm-12">
                      {errors.status && <small className="text-danger">{t('requiredField')}</small>}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">{t('submit')}</button>
                </form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}

export default DeviceAdd
