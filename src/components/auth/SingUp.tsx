import { supabase } from '../../supabaseClient'
import { useState } from "react";

const SignUp = (props: any) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConf, setPasswordConf] = useState("")

  const onSubmit = async(e) => {
    e.preventDefault();
    if(password == passwordConf){
      try{
        const { error:signUpError } = await supabase.auth.signUp({
          email: email,
          password: password,
        })
        if (signUpError) {
          throw signUpError;
        }
      alert('登録完了メールを確認してください');
      }catch(error){
        alert('エラーが発生しました');
      }
    } else {
      alert('パスワードが一致しません');
    }
  };

  return (
    <>
      <div id="overlay" className="modalBack">
        <div id="modalContent" className="modalContainer">
          <div>
            <p>新規登録</p>
          </div>
          <div>
            <button className="switchSignBtn" onClick={props.toggleInUpFunc} type="button">ログイン</button>
          </div>
          <hr />
          <form onSubmit={onSubmit}>
            <div>
              <label>メールアドレス</label>
              <input type="email"
                required value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input type="password"
                required value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード（確認）</label>
              <input type="password"
                required value={passwordConf}
                onChange={e => setPasswordConf(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">サインアップ</button>
              <button onClick={props.toggleSign} type="button">閉じる</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp;