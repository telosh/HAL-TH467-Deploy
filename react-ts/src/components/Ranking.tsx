
const channel = supabase
  .channel("table-db-changes") // 任意のチャンネル名
  .on(
    "postgres_changes",
    {
      event: "*", // "INSERT" | "UPDATE" | "DELETE" のように特定イベントだけの購読も可能
      schema: "public",
      table: "<テーブル名>",
    },
    (payload) => {
      console.log(payload);
    }
  )
  .subscribe();

// 購読を終了するとき
supabase.removeChannel(channel);