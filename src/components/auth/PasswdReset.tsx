import { FormEvent, useState } from "react";
import { supabase } from "@/supabaseClient";

function PasswordReset() {
    const [email, setEmail] = useState("")
  
    const onSubmit = async (e: FormEvent) => {
      e.preventDefault()
  
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `http://localhost:3000/new-password`
      })
  
      if (error) {
        throw error;
      }
  
      console.log("メールを送信しました。")
    }
  
    return (
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <label>メールアドレス</label>
            <input type="email" 
              required value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <button type="submit">メールを送信</button>
        </form>
      </section>
    )
  }
  
  export default PasswordReset;