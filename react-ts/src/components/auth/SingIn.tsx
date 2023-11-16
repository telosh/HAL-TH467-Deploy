import { supabase } from "../../supabaseClient"
import { FormEvent, useState } from "react"

const SignIn = (props: any) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider:'github'
    // })
    if (error) {
      throw error;
    }
    if(data){
      location.href = "/home";
    }
  }

  return (
    <>
      <div id="overlay" className="modalBack">
        <div id="modalContent" className="modalContainer">
          <div>
            <p>ログイン</p>
          </div>
          <div>
              <button className="switchSignBtn" onClick={props.toggleInUpFunc} type="button">新規作成</button>
          </div> 
          <hr />
          <div>
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
                <button type="submit">ログイン</button>
                <button onClick={props.toggleSign} type="button">閉じる</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
  )
}


export default SignIn;