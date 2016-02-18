(function() {
    var Message = React.createClass({
        render: function() {
            return (
                <a href="#" className="list-group-item">
                    <h3 className="list-group-item-heading"><strong>{this.props.from}</strong></h3>
                    <h4>{this.props.subject}</h4>
                    <p>{this.props.snippet}</p>
                </a>
            );
        }
    });

    var MessageList = React.createClass({
        render: function() {
            var messageNodes = this.props.data.map(function(message) {
                return (
                    <Message key={message.id} from={message.from} subject={message.subject} snippet={message.snippet} />
                );
            });
            return (
                <div className="eac-list list-group">
                    {messageNodes}
                </div>
            );
        }
    });

    function loadMessages() {
        return fetch("data/messages.json").then(function(response) {
            return response.json();
        });
    }

    function populateMessages(messages) {
        ReactDOM.render(
            <MessageList data={messages} />,
            document.querySelector("#list-container")
        );
        return messages;
    }

    function countUnread(messages) {
        return messages.filter(function(message) {
            return message.unread;
        }).length;
    }

    function populateCounts(messages) {
        // grab unread count from list of messages
        var unread = countUnread(messages);

        // populate count in title
        ReactDOM.render(
            <h1>Inbox <small>({unread} unread)</small></h1>,
            document.querySelector("#header")
        );

        // title itself
        document.title = "Inbox (" + unread + ")";

        // maintain the chain
        return messages;
    }

    function refreshMessages() {
        return loadMessages()
            .then(populateCounts)
            .then(populateMessages);
    }

    refreshMessages();
}());

