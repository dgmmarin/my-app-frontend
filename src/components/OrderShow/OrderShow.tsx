import React, { FC } from 'react';
import { OrderShowWrapper } from './OrderShow.styled';
import { Link, useParams } from 'react-router-dom';
import { ListGroup, Badge, Row, Col, Button, Card, Accordion, Modal } from 'react-bootstrap';
import {
	useListOrderSingleQuery,
	useIncreaseOrderProductMutation,
	useDecreaseOrderProductMutation,
	useResolveOrderProductMutation,
	useDeleteOrderProductMutation
} from '../../redux/slices/userApiSlice';
import { FaCheck, FaEye, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hooks';

interface OrderShowProps { }
const OrderShow: FC<OrderShowProps> = () => {
	const { orderId } = useParams();
	const { data: order, isLoading, isSuccess, isError, error, refetch } = useListOrderSingleQuery({ orderId: orderId });
	const [modalShow, setModalShow] = React.useState(false);
	const [modalTitle, setModalTitle] = React.useState('');
	const [modalBody, setModalBody] = React.useState('');
	const [itemId, setItemId] = React.useState('');
	const dispatch = useAppDispatch();
	const [increaseOrderProduct] = useIncreaseOrderProductMutation();
	const [decreaseOrderProduct] = useDecreaseOrderProductMutation();
	const [resolveOrderProduct] = useResolveOrderProductMutation();
	const [deleteOrderProduct] = useDeleteOrderProductMutation();


	const showModal = (title: string, body: any, itemId: string) => {
		setModalTitle(title);
		setModalBody(body);
		setItemId(itemId);
		setModalShow(true);
	}

	const increaseQuantity = async (orderId: string, orderProduyctId: string, quantity: number) => {
		try {
			await increaseOrderProduct({ orderId: orderId, productId: orderProduyctId, quantity: quantity }).unwrap();
			await refetch();
			toast.success(`quantity increased by ${quantity}`)
		} catch (error: any) {
			toast.error(`error on increasing quantity ${error.data}`)
		}
	}

	const decreaseQuantity = async (orderId: string, orderProduyctId: string, quantity: number) => {
		try {
			await decreaseOrderProduct({ orderId: orderId, productId: orderProduyctId, quantity: quantity }).unwrap();
			await refetch();
			toast.success(`quantity decreased by ${quantity}`)
		} catch (error: any) {
			toast.error(`error on decreasing quantity ${error.data}`)
		}
	}

	const removeOrderProduct = async (orderId: string, orderProduyctId: string) => {
		try {
			await deleteOrderProduct({ orderId: orderId, productId: orderProduyctId }).unwrap();
			await refetch();
			toast.success(`order product  ${orderProduyctId} deleted`)
		} catch (error: any) {
			toast.error(`error on deleting order product ${error.data}`)
		}
	}

	const closeOrderProduct = async (orderId: string, orderProduyctId: string) => {
		try {
			await resolveOrderProduct({ orderId: orderId, productId: orderProduyctId }).unwrap();
			await refetch();
			toast.success(`order product  ${orderProduyctId} resolved`)
		} catch (error: any) {
			toast.error(`error on resolving order product ${error.data}`)
		}
	}

	const prodcucts: any = [];
	if (order) {
		Object.keys(order.orderProducts).map((k, i) => {
			prodcucts.push(
				<ListGroup.Item key={order.orderProducts[k].uuid}>
					<Row style={{ textAlign: "right" }}>
						<Col xs={12} sm={6} className="align-items-start" style={{ textAlign: "left", paddingLeft: "16px" }}>
							{order.orderProducts[k].product.name}
						</Col>
						<Col xs={12} sm={6} >
							<Row >
								<div className='actions-cnt'>
									{order.orderProducts[k].quantity} x {order.orderProducts[k].price + " "}
									<FaMinus className='mx-2' onClick={() => decreaseQuantity(orderId!, order.orderProducts[k].uuid, 1)} />
									<FaPlus className='mx-2' onClick={() => increaseQuantity(orderId!, order.orderProducts[k].uuid, 1)} />
									<FaCheck className='mx-2' color='green' onClick={() => closeOrderProduct(orderId!, order.orderProducts[k].uuid)} />
									<FaTrash className='mx-2' color='red' onClick={() => removeOrderProduct(orderId!, order.orderProducts[k].uuid)} />
								</div>
							</Row>
						</Col>
					</Row>
				</ListGroup.Item>
			)
		})
	}

	if (isLoading) {
		return <OrderShowWrapper data-testid="OrderShow">
			Loading...
		</OrderShowWrapper>
	}

	if (isError) {
		return <OrderShowWrapper data-testid="OrderShow">
			Error on loading order {orderId}
		</OrderShowWrapper>
	}

	return <OrderShowWrapper data-testid="OrderShow">
		<Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3">
			<Card className="mb-3" style={{ textAlign: "start" }}>
				<Card.Header>
					Order: {order?.uuid}
				</Card.Header>
				<Card.Body>
					<ListGroup style={{ border: "0px" }}>
						{prodcucts}
					</ListGroup>
				</Card.Body>
				<Card.Footer className="text-muted">
					Total: {order?.total}
				</Card.Footer>
			</Card>
		</Col>
		<Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3"></Col>

		<MyVerticallyCenteredModal
			show={modalShow}
			onHide={() => setModalShow(false)}
			title={modalTitle}
			body={modalBody}
			itemId={itemId}
		/>
	</OrderShowWrapper>
}


function MyVerticallyCenteredModal(props: any) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{props.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>Centered Modal</h4>
				{props.body}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default OrderShow;
