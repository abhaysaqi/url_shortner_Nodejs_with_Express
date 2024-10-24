import { connect } from 'mongoose';

async function ConnectMongoDB(url) {
    return connect(url);
}

export {
    ConnectMongoDB
}
