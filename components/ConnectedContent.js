import { Account } from "../context/Account"

const ConnectedContent = ({children}) => {

    function Content() {
        if (Account.isConnected()) {
            
            return <>
            <div>Connected</div>
            {children}
            </>
        }
        else {
            return <div>Not connected</div>
        }
    }

    return <div>
        <Content/>
    </div>
}

export default ConnectedContent
