package edu.lehigh.cse216.juw225.admin;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

import java.util.ArrayList;
import java.util.Map;

/**
 * App is our basic admin app.  For now, it is a demonstration of the six key 
 * operations on a database: connect, insert, update, query, delete, disconnect
 */
public class App
{

    /**
     * Print the menu for our program
     */
    static void menu()
    {
        System.out.println("Main Menu");
        System.out.println("  [T] Create tblData");
        System.out.println("  [D] Drop tblData");
        System.out.println("  [1] Query for a specific row");
        System.out.println("  [*] Query for all rows");
        System.out.println("  [-] Delete a row");
        System.out.println("  [+] Insert a new row");
        System.out.println("  [~] Update a row");
        System.out.println("  [q] Quit Program");
        System.out.println("  [?] Help (this message)");
    }

    /**
     * Ask the user to enter a menu option; repeat until we get a valid option
     * 
     * @param in A BufferedReader, for reading from the keyboard
     * 
     * @return The character corresponding to the chosen menu option
     */
    static char prompt(BufferedReader in)
    {
        // The valid actions:
        String actions = "TD1*-+~q?";

        // We repeat until a valid single-character option is selected        
        while (true) {
            System.out.print("[" + actions + "] :> ");
            String action;
            try {
                action = in.readLine();
            } catch (IOException e) {
                e.printStackTrace();
                continue;
            }
            if (action.length() != 1)
                continue;
            if (actions.contains(action)) {
                return action.charAt(0);
            }
            System.out.println("Invalid Command");
        }
    }

    /**
     * Ask the user to enter a String message
     * 
     * @param in A BufferedReader, for reading from the keyboard
     * @param message A message to display when asking for input
     * 
     * @return The string that the user provided.  May be "".
     */
    static String getString(BufferedReader in, String message)
    {
        String s;
        try {
            System.out.print(message + " :> ");
            s = in.readLine();
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
        return s;
    }

    /**
     * Ask the user to enter an integer
     * 
     * @param in A BufferedReader, for reading from the keyboard
     * @param message A message to display when asking for input
     * 
     * @return The integer that the user provided.  On error, it will be -1
     */
    static int getInt(BufferedReader in, String message)
    {
        int i = -1;
        try {
            System.out.print(message + " :> ");
            i = Integer.parseInt(in.readLine());
        } catch (IOException e) {
            e.printStackTrace();
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        return i;
    }

    /**
     * The main routine runs a loop that gets a request from the user and
     * processes it
     * 
     * @param argv Command-line options.  Ignored by this program.
     */
    public static void main(String[] argv)
    {
        // get the Postgres configuration from the environment
        Map<String, String> env = System.getenv();
        String ip = env.get("POSTGRES_IP");
        String port = env.get("POSTGRES_PORT");
        String user = env.get("POSTGRES_USER");
        String pass = env.get("POSTGRES_PASS");

        // Get a fully-configured connection to the database, or exit 
        // immediately
        Database db = Database.getDatabase(ip, port, user, pass);
        
        if (db == null)
            return;

        // Start our basic command-line interpreter:
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        while (true)
        {
            // Get the user's request, and do it
            //
            // NB: for better testability, each action should be a separate
            //     function call
            char action = prompt(in);
            int id, res;

            switch(action)
            {
                case '?':
                    menu();
                    break;


                case 'q':
                    db.disconnect();
                    break;


                case 'T':
                    db.createTable();
                    break;


                case 'D':
                    db.dropTable();
                    break;


                case '1':
                    id = getInt(in, "Enter the row ID");

                    if (id == -1)
                        continue;

                    Database.RowData resDb = db.selectOne(id);

                    if (resDb != null)
                    {
                        System.out.println("  [" + resDb.mId + "] " + resDb.mSubject);
                        System.out.println("  --> " + resDb.mMessage);
                    }
                    break;


                case '*':
                    ArrayList<Database.RowData> resAl = db.selectAll();

                    if (resAl == null)
                        continue;
                    
                    System.out.println("  Current Database Contents");
                    System.out.println("  -------------------------");

                    for (Database.RowData rd : resAl)
                        System.out.println("  [" + rd.mId + "] " + rd.mSubject);
                    break;


                case '-':
                    id = getInt(in, "Enter the row ID");

                    if (id == -1)
                        continue;

                    res = db.deleteRow(id);

                    if (res == -1)
                        continue;

                    System.out.println("  " + res + " rows deleted");
                    break;


                case '+':
                    String subject = getString(in, "Enter the subject");
                    String message = getString(in, "Enter the message");

                    if (subject.equals("") || message.equals(""))
                        continue;

                    res = db.insertRow(subject, message);

                    System.out.println(res + " rows added");
                    break;


                case '~':
                    id = getInt(in, "Enter the row ID :> ");

                    if (id == -1)
                        continue;

                    String newMessage = getString(in, "Enter the new message");

                    res = db.updateOne(id, newMessage);

                    if (res == -1)
                        continue;

                    System.out.println("  " + res + " rows updated");
                    break;
            }
        }

        // Always remember to disconnect from the database when the program 
        // exits
        //db.disconnect();
    }
}