const Popup = ({ message, onCancel, onConfirm }) => {
    return (
        <div className="popupBox">
            <div className="popupBoxInner">
                <h1 className="popupTitle">{message}</h1>
                {onCancel ? (
                    <div className={'popupButton'}>
                        <button onClick={onConfirm}>확인</button>
                        <button onClick={onCancel}>취소</button>
                    </div>
                ) : (
                    <div className={'popupButton'}>
                        <button onClick={onConfirm}>확인</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Popup
