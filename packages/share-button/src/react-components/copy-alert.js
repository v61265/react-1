import React from 'react' // eslint-disable-line
import styled from 'styled-components'

const CopyAlert = styled.div`
  p {
    padding: 21px 10px;
    border-radius: 16px;
    background: rgba(73, 73, 73, 0.8);
    color: #ffffff;
    text-align: center;
    position: fixed;
    top: 54px;
    left: 50%;
    margin: auto;
    transform: translate(-50%, 0);
    opacity: 0;
  }

  .animate {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .fadeOut {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
  }

  @-webkit-keyframes fadeOut {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

/**
 * @param {Object} props
 * @param {boolean} [props.showAlert]
 * @returns {JSX.Element}
 */

export default function Alert({ showAlert }) {
  return (
    <CopyAlert>
      <p className={`${showAlert} copy-alert`}>已複製連結至剪貼簿</p>
    </CopyAlert>
  )
}
