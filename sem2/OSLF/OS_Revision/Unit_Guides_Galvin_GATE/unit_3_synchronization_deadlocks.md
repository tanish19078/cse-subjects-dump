# Unit 3: Process Synchronization and Deadlocks

Lectures covered: 16-21  
Syllabus weightage: 20%  
Galvin alignment: Process synchronization and deadlocks.

## 1. Unit Target

By the end of this unit, you should be able to:

- Explain race condition and critical-section problem.
- State the three critical-section requirements.
- Understand Peterson's solution at MCQ level.
- Explain hardware synchronization instructions.
- Use mutexes and semaphores conceptually.
- Recognize producer-consumer, readers-writers, and dining philosophers patterns.
- Define deadlock and its four necessary conditions.
- Solve resource-allocation graph and wait-for graph questions.
- Apply deadlock prevention, avoidance, detection, and recovery ideas.
- Solve Banker's algorithm safe-sequence questions.

## Official Lecture Breakdown

| Lectures | Official handout topic | Covered below |
|---:|---|---|
| 16-18 | Synchronization background, critical-section problem, two-process solution, multiple-process solution, synchronization hardware, semaphores | sections 3-13 |
| 19-21 | Deadlock system model, characterization, handling methods, prevention, avoidance, detection, recovery | sections 14-27 |

## 2. Mental Model

This unit is about controlled sharing.

Processes and threads may share:

- variables
- files
- memory
- devices
- buffers
- locks

If many processes access shared data at the same time, the result can become unpredictable. Synchronization prevents incorrect sharing. Deadlock happens when synchronization/resource allocation goes wrong and processes wait forever.

## 3. Race Condition

A race condition occurs when:

- multiple processes/threads access shared data concurrently, and
- final result depends on the exact order/timing of execution.

Classic example:

```text
counter = counter + 1
```

This simple line may internally involve:

```text
load counter
increment register
store counter
```

If two processes interleave these steps, update may be lost.

MCQ clue:

- "Final output depends on order of execution" means race condition.

## 4. Critical Section

A critical section is the part of a program where shared resources/data are accessed or modified.

General structure:

```text
do {
    entry section
    critical section
    exit section
    remainder section
} while (true);
```

Meaning:

| Section | Purpose |
|---|---|
| Entry section | request permission to enter CS |
| Critical section | access shared data/resource |
| Exit section | release permission |
| Remainder section | other code |

## 5. Three Requirements for Critical-Section Solution

| Requirement | Meaning | Prevents |
|---|---|---|
| Mutual exclusion | only one process in critical section at a time | simultaneous shared access |
| Progress | if CS is free, selection of next process cannot be delayed forever | deadlock-like indecision |
| Bounded waiting | limit exists on number of times others enter before a waiting process | starvation |

Trick:

```text
Mutual exclusion = only one inside.
Progress = someone can enter if possible.
Bounded waiting = nobody waits forever.
```

MCQ trap:

- Bounded waiting is the condition directly linked with starvation prevention.

## 6. Peterson's Solution

Peterson's solution is a classic software solution for two processes.

Shared variables:

```c
boolean flag[2];
int turn;
```

For process `Pi`, where `j` is the other process:

```c
flag[i] = true;
turn = j;
while (flag[j] && turn == j) {
    // wait
}

// critical section

flag[i] = false;
```

Meaning:

- `flag[i] = true`: process `i` wants to enter.
- `turn = j`: give other process priority if it also wants to enter.
- Wait while other process wants to enter and it is other process's turn.

Important:

- Works for two processes.
- Satisfies mutual exclusion, progress, and bounded waiting under classical assumptions.

MCQ trap:

- Peterson's solution is software-based.
- It is for two processes, not arbitrary `n` directly.

## 7. Multiple-Process Software Solutions

Bakery algorithm idea:

- Processes take a number like customers in a bakery.
- Lowest number enters first.
- Tie is broken by process ID.

MCQ level:

- Bakery algorithm is for multiple processes.
- It provides ordering to decide entry into critical section.

## 8. Hardware Support for Synchronization

Software-only solutions are hard to implement reliably on modern systems, so hardware provides atomic instructions.

Atomic means:

```text
operation completes as one indivisible unit
```

### TestAndSet

Concept:

```c
boolean TestAndSet(boolean *target) {
    boolean old = *target;
    *target = true;
    return old;
}
```

Use:

- If old value was false, lock was free.
- If old value was true, lock was already held.

### CompareAndSwap

Concept:

```c
int CompareAndSwap(int *value, int expected, int new_value) {
    int old = *value;
    if (*value == expected) {
        *value = new_value;
    }
    return old;
}
```

Use:

- Change value only if current value equals expected value.

### Memory Barriers

Memory barriers ensure memory operations appear in a required order across processors.

MCQ level:

- Important in multiprocessor systems.
- Prevents unexpected reordering effects.

## 9. Mutex Locks

A mutex lock protects a critical section.

Operations:

```text
acquire()
release()
```

Basic idea:

```text
acquire lock
critical section
release lock
```

Spinlock:

- A lock where process keeps checking in a loop.
- Wastes CPU while waiting.
- Useful only when waiting time is very short.

MCQ trap:

- Spinlock uses busy waiting.
- Busy waiting wastes CPU cycles.

## 10. Semaphores

A semaphore is an integer variable accessed only through atomic operations:

```text
wait(S)   also called P(S)
signal(S) also called V(S)
```

### Basic Busy-Wait Definition

```c
wait(S) {
    while (S <= 0) {
        // busy wait
    }
    S--;
}

signal(S) {
    S++;
}
```

### Blocking Semaphore

To avoid busy waiting:

- If semaphore unavailable, process is blocked.
- Process is placed in waiting queue.
- `signal()` wakes one waiting process.

### Types of Semaphores

| Type | Values | Use |
|---|---|---|
| Binary semaphore | 0 or 1 | mutual exclusion |
| Counting semaphore | non-negative integer range | multiple resource instances |

Trick:

- Binary semaphore behaves like mutex, but mutex ownership rules may be stricter in real systems.
- Counting semaphore initialized to number of available resource instances.

## 11. Producer-Consumer / Bounded Buffer

Problem:

- Producer creates items.
- Consumer removes items.
- Buffer has limited size `n`.

Semaphores:

```text
mutex = 1
empty = n
full = 0
```

Producer:

```text
produce item
wait(empty)
wait(mutex)
add item to buffer
signal(mutex)
signal(full)
```

Consumer:

```text
wait(full)
wait(mutex)
remove item from buffer
signal(mutex)
signal(empty)
consume item
```

Trick:

- Producer waits for `empty` because it needs empty slot.
- Consumer waits for `full` because it needs filled slot.
- Both use `mutex` to protect buffer access.

MCQ trap:

- If `mutex` is taken before `empty/full` in some variants, deadlock risk may arise depending on order.

## 12. Readers-Writers Problem

Goal:

- Multiple readers can read at same time.
- Writer needs exclusive access.

Shared:

```text
read_count = 0
mutex = 1
rw_mutex = 1
```

Idea:

- First reader locks writer out.
- Last reader allows writer.

Writer:

```text
wait(rw_mutex)
write
signal(rw_mutex)
```

Reader:

```text
wait(mutex)
read_count++
if read_count == 1:
    wait(rw_mutex)
signal(mutex)

read

wait(mutex)
read_count--
if read_count == 0:
    signal(rw_mutex)
signal(mutex)
```

MCQ trap:

- Readers can share reading.
- Writers require exclusive access.

## 13. Dining Philosophers

Five philosophers, five chopsticks.

Each philosopher needs two chopsticks to eat.

Naive approach:

```text
pick left chopstick
pick right chopstick
eat
release left
release right
```

Problem:

- If all pick left chopstick first, all wait forever for right chopstick.
- This is deadlock.

Possible fixes:

- Allow at most four philosophers to sit.
- Pick both chopsticks only if both available.
- Odd/even philosophers pick in different order.

## 14. Deadlock Definition

A deadlock occurs when a set of processes is permanently blocked because each process is waiting for an event/resource that can be caused/released only by another process in the set.

Short version:

```text
Processes wait forever in a cycle.
```

## 15. Four Necessary Conditions for Deadlock

All four must hold simultaneously.

| Condition | Meaning |
|---|---|
| Mutual exclusion | at least one resource is non-sharable |
| Hold and wait | process holds resource while waiting for another |
| No preemption | resource cannot be forcibly taken |
| Circular wait | circular chain of processes waiting |

Trick:

```text
MEHN-C
Mutual exclusion, Hold and wait, No preemption, Circular wait
```

MCQ trap:

- These are necessary conditions, not individually sufficient.
- Breaking any one prevents deadlock.

## 16. Resource Allocation Graph (RAG)

Symbols:

| Symbol | Meaning |
|---|---|
| Circle | process |
| Rectangle | resource type |
| Dots inside rectangle | resource instances |
| Process -> Resource | request edge |
| Resource -> Process | assignment edge |

Rules:

- No cycle means no deadlock.
- Cycle with single instance per resource type means deadlock.
- Cycle with multiple instances means deadlock may or may not exist.

MCQ trap:

- Cycle is not always deadlock when resources have multiple instances.

## 17. Wait-For Graph

Used when each resource type has a single instance.

Constructed by removing resource nodes:

```text
Pi -> Pj means Pi waits for a resource held by Pj
```

Cycle in wait-for graph means deadlock.

## 18. Methods for Handling Deadlocks

| Method | Meaning |
|---|---|
| Prevention | ensure at least one necessary condition never holds |
| Avoidance | use future maximum needs to avoid unsafe states |
| Detection and recovery | allow deadlock, detect it, recover |
| Ignore/Ostrich | pretend deadlocks do not occur often |

MCQ trap:

- Deadlock avoidance requires prior information about maximum resource needs.
- Deadlock prevention is more restrictive.

## 19. Deadlock Prevention

### Prevent Mutual Exclusion

Make resources sharable if possible.

Limitation:

- Some resources are inherently non-sharable, like printers.

### Prevent Hold and Wait

Methods:

- Request all resources before execution.
- Allow process to request resources only when holding none.

Disadvantages:

- Low resource utilization.
- Starvation possible.

### Prevent No Preemption

If a process requests a resource that cannot be allocated:

- preempt resources it holds, or
- roll it back and restart later.

MCQ trap:

- Preempted process may need rollback.

### Prevent Circular Wait

Impose total ordering of resource types.

Example:

```text
R1 < R2 < R3 < R4
```

Processes must request resources in increasing order only.

Trick:

- Circular wait prevention = resource ordering.

## 20. Deadlock Avoidance

Avoidance uses information about future requests.

Key idea:

- Do not allocate resource if allocation can lead to unsafe state.

### Safe State

A state is safe if system can allocate resources to each process in some order so all processes can finish.

That order is called a safe sequence.

### Unsafe State

Unsafe means:

- no safe sequence currently guaranteed.

Important:

- Unsafe does not necessarily mean deadlocked.
- Deadlocked state is unsafe.

Relationship:

```text
Safe -> definitely not deadlocked
Unsafe -> may lead to deadlock
Deadlock -> unsafe
```

MCQ trap:

- "Unsafe = deadlock" is false.

## 21. Banker's Algorithm

Used for multiple instances of resources.

Data structures:

| Name | Meaning |
|---|---|
| Available[m] | available instances of each resource type |
| Max[n][m] | maximum demand of each process |
| Allocation[n][m] | currently allocated resources |
| Need[n][m] | remaining resource need |

Formula:

```text
Need = Max - Allocation
```

### Safety Algorithm

1. Set `Work = Available`.
2. Set `Finish[i] = false` for all processes.
3. Find a process `i` such that:

```text
Finish[i] == false and Need[i] <= Work
```

4. Pretend process finishes:

```text
Work = Work + Allocation[i]
Finish[i] = true
```

5. Repeat until no more process can be found.
6. If all `Finish[i] = true`, system is safe.

GATE solving trick:

- Write `Need` matrix first.
- Then keep updating `Work`.
- If multiple processes can run, choose any; safe sequence need not be unique.

### Resource Request Algorithm

For request by process `Pi`:

1. Check `Request[i] <= Need[i]`.
2. Check `Request[i] <= Available`.
3. Pretend allocation.
4. Run safety algorithm.
5. Grant only if resulting state is safe.

MCQ trap:

- Request can be less than available but still denied if resulting state is unsafe.

## 22. Deadlock Detection

### Single Instance

Use wait-for graph.

Cycle = deadlock.

### Multiple Instances

Use detection algorithm similar to Banker's safety algorithm.

Difference from avoidance:

- Detection does not prevent unsafe states.
- It checks whether deadlock has already occurred.

## 23. Recovery from Deadlock

Methods:

### Process Termination

Options:

- Abort all deadlocked processes.
- Abort one process at a time until deadlock cycle breaks.

### Resource Preemption

Steps:

- Select victim process/resource.
- Preempt resource.
- Roll back victim process.
- Avoid starvation by limiting how often same process is victim.

Victim selection factors:

- Process priority.
- Time already executed.
- Time remaining.
- Number/type of resources held.
- Number of processes affected.

MCQ trap:

- Rollback is associated with preemption recovery.

## 24. Prevention vs Avoidance vs Detection

| Aspect | Prevention | Avoidance | Detection |
|---|---|---|---|
| Basic idea | break deadlock condition | avoid unsafe state | find deadlock after it occurs |
| Needs future max info? | no | yes | no/less strict |
| Resource usage | often poor | better than prevention | best until deadlock occurs |
| Example | resource ordering | Banker's algorithm | wait-for graph |

## 25. Common GATE-Level Problem Types

### Type 1: Identify Deadlock Condition

Question:

```text
Process holds resource and waits for another.
```

Answer:

- Hold and wait.

Question:

```text
Resources cannot be forcibly taken.
```

Answer:

- No preemption.

### Type 2: RAG Cycle

Use:

- No cycle -> no deadlock.
- Cycle + single instance -> deadlock.
- Cycle + multiple instances -> maybe deadlock.

### Type 3: Banker Safe Sequence

Steps:

1. Compute Need.
2. Start Work = Available.
3. Find process where Need <= Work.
4. Add its Allocation to Work.
5. Continue.

### Type 4: Semaphore Initial Values

Producer-consumer:

```text
mutex = 1, empty = n, full = 0
```

Readers-writers:

```text
mutex = 1, rw_mutex = 1, read_count = 0
```

### Type 5: Starvation vs Deadlock

Deadlock:

- processes wait forever due to circular dependency.

Starvation:

- process waits indefinitely because others keep getting preference.

## 26. Common Mistakes

1. Saying one deadlock condition alone is enough.
2. Treating unsafe state as deadlock.
3. Forgetting `Need = Max - Allocation`.
4. In Banker's algorithm, adding Need to Work instead of Allocation.
5. Confusing deadlock prevention and avoidance.
6. Saying semaphores are ordinary variables; they require atomic operations.
7. Confusing mutex with counting semaphore.
8. Forgetting that spinlocks use busy waiting.
9. Saying cycle in RAG always means deadlock, even with multiple resource instances.

## 27. Quick Revision Box

- Race condition = result depends on timing/order.
- Critical-section requirements: mutual exclusion, progress, bounded waiting.
- Peterson's solution uses `flag` and `turn` for two processes.
- Atomic instructions: TestAndSet, CompareAndSwap.
- Spinlock = busy waiting.
- Semaphore operations: wait/P and signal/V.
- Producer waits on `empty`, consumer waits on `full`.
- Deadlock conditions: mutual exclusion, hold and wait, no preemption, circular wait.
- Avoidance uses safe state.
- Banker's formula: Need = Max - Allocation.
- Unsafe does not always mean deadlock.
- Cycle in single-instance RAG means deadlock.

## 28. Practice Prompts

1. Explain race condition with an example.
2. State and explain the three critical-section requirements.
3. Explain Peterson's solution variables.
4. Write semaphore solution for producer-consumer.
5. Differentiate deadlock and starvation.
6. Explain all four deadlock conditions with examples.
7. Solve a Banker's algorithm safe-sequence problem.
8. Explain why unsafe state is not necessarily deadlock.
