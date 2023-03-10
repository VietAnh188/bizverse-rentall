// Redux Form
import { reset } from 'redux-form';

// Redux action
import { sendMessageAction } from '../../../actions/message/sendMessageAction';

async function submit(values, dispatch) {

	let threadId = values.threadId;
	let threadType = values.threadType;
	let type = values.type;
	let content = values.content;
	dispatch(sendMessageAction({
		threadId,
		threadType,
		content,
		type,
		personCapacity: 0,
		receiverName: values.receiverName,
		senderName: values.senderName,
		receiverType: values.receiverType,
		receiverEmail: values.receiverEmail
	}));
	dispatch(reset('SendMessage'));
}

export default submit;